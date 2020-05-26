import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import TextImage from './TextImage';
import Rectangle from "./Rectangle";

const showWidth = 1200;

const originalImageSize = {
  width: 2528,
  height: 3507
};

const initialRectangles = [
  {
    x0: 10,
    y0: 10,
    x1: 110,
    y1: 110
  },
  {
    x0: 10,
    y0: 10,
    x1: 110,
    y1: 110
  }
];

class Mapper extends Component {
  constructor(props) {
    super(props);
    const showHeight = showWidth * (props.height / props.width);
    const resizeRatio = showWidth / props.width;

    const apiUrl = 'http://kazakh-trs.kz:8088/api/v1';

    this.state = {
      imgSrc: apiUrl + props.imgSrc,
      rectangles: props.coordinates,
      selectedId: null,
      showWidth: props.imgWidth,
      showHeight: props.imgHight,
      resizeRatio: resizeRatio
    };

    this.checkDeselect = this.checkDeselect.bind(this);
    this.addNewShape = this.addNewShape.bind(this);
    this.removeSelectedShape = this.removeSelectedShape.bind(this);
  }

  selectShape(vSelectedId) {
    this.setState({selectedId: vSelectedId})
  }

  setRectangles(rectangles) {
    this.setState({rectangles: rectangles})
  }

  removeSelectedShape() {
    const { rectangles, selectedId } = this.state;
    if (selectedId === null) return false;
    delete rectangles[selectedId];
    this.setRectangles(rectangles);
  }

  addNewShape() {
    const { rectangles } = this.state;
    rectangles.push(
      {
        x0: 10,
        y0: 10,
        x1: 110,
        y1: 110
      }
    );
    this.setState({rectangles: rectangles});
  }

  checkDeselect(e) {
    if (!e.target.hasOwnProperty('attrs')
        || !e.target.attrs.hasOwnProperty('draggable')) {
        this.selectShape(null)
    }
  }

  // так как загружаемое изображение зачастую больше, чем то, что выводится
  // нужно перерасчитывать координаты слов на изображениях
  coordinatesConversation(rect, index) {
    const { resizeRatio } = this.state;

    const x0 = (Math.floor(rect.x0 * resizeRatio * 100) / 100);
    const y0 = (Math.floor(rect.y0 * resizeRatio * 100) / 100);

    const x1 = (Math.ceil(rect.x1 * resizeRatio * 100) / 100);
    const y1 = (Math.ceil(rect.y1 * resizeRatio * 100) / 100);

    console.log(x0, x1, y0, y1);

    return {
      x: x0,
      y: y0,
      width: x1 - x0,
      height: y1 - y0,
      stroke: 'red',
      strokeWidth: 1,
      fill: 'transparent',
      id: index
    }
  }

  // обратное преобразование координат для сохранения в базе в изначальном формате
  backwardCoordinatesConversation(newParams) {
    const { resizeRatio } = this.state;

    const x0 = newParams.x / resizeRatio;
    const y0 = newParams.y / resizeRatio;

    const x1 = (newParams.width  + newParams.x) / resizeRatio;
    const y1 = (newParams.height + newParams.y) / resizeRatio;

    console.log(x0, x1, y0, y1);

    return {
      x0,
      y0,
      x1,
      y1
    }
  }

  render() {
    const {rectangles, selectedId, showHeight, showWidth, recognizedText, imgSrc} = this.state;
    console.log("imgSrc", imgSrc)
    return (
      <div>
        <button onClick={this.addNewShape} type={'button'}>Добавить</button>
        {selectedId !== null
            ? <button onClick={this.removeSelectedShape} type={'button'}>Удалить</button>
            : ''
        }
        <Stage width={showWidth} height={showHeight}
          onMouseDown={this.checkDeselect}
          onTouchStart={this.checkDeselect}
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
            console.log('rect',rect)
            const preparedRect = this.coordinatesConversation(rect, i);
            return (
              <Rectangle
                  shapeProps={preparedRect}
                  isSelected={preparedRect.id === selectedId}
                  isDraggable={true} // передать false чтобы запретить редактировать шейпы
                  onSelect={() => {
                    this.selectShape(preparedRect.id);
                  }}
                  onChange={newAttrs => {
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
        <button>Сохранить и распознать текст</button>
        <textarea value={recognizedText}/>
      </div>
    );
  }
}
export default Mapper;
