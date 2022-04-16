import React, { Component } from "react";
import { Stage, Layer } from "react-konva";
import TextImage from "./TextImage";
import Rectangle from "./Rectangle";
import { url } from "../serverUrl";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import RecognitionService from "../../../services/RecognitionService";
import { Button } from "../../form";
// eslint-disable-next-line no-unused-vars
const process = require('process');

const showWidth = 1200;

class Mapper extends Component {
  constructor(props) {
    super(props);
    const showHeight = showWidth * (props.height / props.width);
    const resizeRatio = showWidth / props.width;

    this.state = {
      imgSrc: url + props.imgSrc,
      rectangles: props.coordinates,
      imgName: props.imgName,
      selectedId: null,
      showWidth: showWidth,
      showHeight: showHeight,
      resizeRatio: resizeRatio,
      recognizedText: props.imgText || "",
    };

    this.checkDeselect = this.checkDeselect.bind(this);
    this.addNewShape = this.addNewShape.bind(this);
    this.removeSelectedShape = this.removeSelectedShape.bind(this);
    this.recognizeText = this.recognizeText.bind(this);
  }

  recognizeText = async (name) => {
    try {
      const result = await RecognitionService.recognizeText(name);
      console.log("recognizeText result", result);
    } catch (e) {
      console.log("recognizeText error", e);
    }
    this.props.closeMapper();
  };

  componentDidMount() {
    const { imgText } = this.props;
    this.setState({ recognizedText: imgText || "" });
  }

  changeText = ({ target: { value } }) => {
    const { setImgText } = this.props;
    console.log("Mapper -> changeText -> event", value);
    this.setState({ recognizedText: value || "" });
    setImgText(value || "");
  };

  saveRectangles = async (name) => {
    const { recognizedText } = this.state;
    console.log("Mapper -> saveRectangles -> recognizedText", recognizedText);
    const { rectangles } = this.state;

    try {
      const res = await RecognitionService.saveRectangles(name, {
        coordinates: rectangles,
        text: recognizedText,
      });
      console.log("Mapper -> saveRectangles -> res", res);
    } catch (e) {
      console.log("Mapper -> saveRectangles -> error", e);
    }
  };

  selectShape(selectedId) {
    this.setState({ selectedId });
  }

  setRectangles(rectangles) {
    this.setState({ rectangles });
  }

  removeSelectedShape() {
    const { rectangles, selectedId } = this.state;
    if (selectedId === null) return false;
    console.log("Mapper -> removeSelectedShape -> selectedId", selectedId);
    // delete selected rectangle
    const newRectangles = rectangles.filter((_, index) => index !== selectedId);
    this.setRectangles(newRectangles);
  }

  addNewShape() {
    const { rectangles } = this.state;

    const newRectangle = {
      x0: 10,
      y0: 10,
      x1: 110,
      y1: 110,
    };

    const newRectangles = [...rectangles, newRectangle];
    this.setRectangles(newRectangles);
  }

  checkDeselect(e) {
    if (
      !e.target.hasOwnProperty("attrs") ||
      !e.target.attrs.hasOwnProperty("draggable")
    ) {
      this.selectShape(null);
    }
  }

  // так как загружаемое изображение зачастую больше, чем то, что выводится
  // нужно перерасчитывать координаты слов на изображениях
  coordinatesConversation(rect, index) {
    const { resizeRatio } = this.state;

    const x0 = Math.floor(rect.x0 * resizeRatio * 100) / 100;
    const y0 = Math.floor(rect.y0 * resizeRatio * 100) / 100;

    const x1 = Math.ceil(rect.x1 * resizeRatio * 100) / 100;
    const y1 = Math.ceil(rect.y1 * resizeRatio * 100) / 100;

    return {
      x: x0,
      y: y0,
      width: x1 - x0,
      height: y1 - y0,
      stroke: "red",
      strokeWidth: 1,
      fill: "transparent",
      id: index,
    };
  }

  // обратное преобразование координат для сохранения в базе в изначальном формате
  backwardCoordinatesConversation(newParams) {
    const { resizeRatio } = this.state;

    const x0 = newParams.x / resizeRatio;
    const y0 = newParams.y / resizeRatio;

    const x1 = (newParams.width + newParams.x) / resizeRatio;
    const y1 = (newParams.height + newParams.y) / resizeRatio;

    console.log(x0, x1, y0, y1);

    return {
      x0,
      y0,
      x1,
      y1,
    };
  }

  render() {
    const {
      rectangles,
      selectedId,
      showHeight,
      showWidth,
      imgSrc,
      imgName,
      recognizedText,
    } = this.state;
    console.log("recognizedText", recognizedText);

    return (
      <div>
        <button
          className="svg__button svg__button--add p-1"
          onClick={this.addNewShape}
        >
          <IoMdAddCircle />
        </button>
        {selectedId !== null ? (
          <button
            className="svg__button svg__button--remove p-1"
            onClick={this.removeSelectedShape}
          >
            <FaTrashAlt />
          </button>
        ) : (
          ""
        )}
        <Stage
          width={showWidth}
          height={showHeight}
          onMouseDown={this.checkDeselect}
          onTouchStart={this.checkDeselect}
          style={{ overflow: "scroll", height: "60vh" }}
        >
          <Layer>
            <TextImage
              showHeight={showHeight}
              showWidth={showWidth}
              imageScr={imgSrc}
            />
          </Layer>
          <Layer>
            {rectangles.map((rect, i) => {
              const preparedRect = this.coordinatesConversation(rect, i);
              return (
                <Rectangle
                  key={i}
                  shapeProps={preparedRect}
                  isSelected={preparedRect.id === selectedId}
                  isDraggable={true} // передать false чтобы запретить редактировать шейпы
                  onSelect={() => {
                    this.selectShape(preparedRect.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = rectangles.slice();
                    newAttrs = this.backwardCoordinatesConversation(newAttrs);
                    rects[i] = newAttrs;
                    this.setRectangles(rects);
                  }}
                />
              );
            })}
          </Layer>
        </Stage>
        <div>
          <Button
            className="mr-2"
            onClick={() => this.recognizeText(imgName)}
          >
            Распознать текст
          </Button>
          <button
            className="bg-green-200 rounded p-2"
            onClick={() => this.saveRectangles(imgName)}
          >
            Сохранить
          </button>
          <textarea value={recognizedText} onChange={this.changeText} />
        </div>
      </div>
    );
  }
}
export default Mapper;
