import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import TextImage from './TextImage';
import Rectangle from "./Rectangle";

const showWidth = 1200;

const originalImageSize = {
  width: 1600,
  height: 1600
};

const initialRectangles = [
  {
    x1: 10,
    y1: 10,
    x2: 110,
    y2: 110
  },
  {
    x1: 10,
    y1: 10,
    x2: 110,
    y2: 110
  }
];

class Mapper extends Component {
  constructor(props) {
    super(props);
    const showHeight = showWidth * (originalImageSize.height / originalImageSize.width);
    const resizeRatio = showWidth / originalImageSize.width;

    this.state = {
      rectangles: initialRectangles,
      selectedId: null,
      showWidth: showWidth,
      showHeight: showHeight,
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
        x1: 10,
        y1: 10,
        x2: 110,
        y2: 110
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

    const x1 = (Math.floor(rect.x1 * resizeRatio * 100) / 100);
    const y1 = (Math.floor(rect.y1 * resizeRatio * 100) / 100);

    const x2 = (Math.ceil(rect.x2 * resizeRatio * 100) / 100);
    const y2 = (Math.ceil(rect.y2 * resizeRatio * 100) / 100);

    console.log(x1, x2, y1, y2);

    return {
      x: x1,
      y: y1,
      width: x2 - x1,
      height: y2 - y1,
      stroke: 'red',
      strokeWidth: 1,
      fill: 'transparent',
      id: index
    }
  }

  // обратное преобразование координат для сохранения в базе в изначальном формате
  backwardCoordinatesConversation(newParams) {
    const { resizeRatio } = this.state;

    const x1 = newParams.x / resizeRatio;
    const y1 = newParams.y / resizeRatio;

    const x2 = (newParams.width  + newParams.x) / resizeRatio;
    const y2 = (newParams.height + newParams.y) / resizeRatio;

    console.log(x1, x2, y1, y2);

    return {
      x1,
      y1,
      x2,
      y2
    }
  }

  render() {
    const {rectangles, selectedId, showHeight, showWidth, recognizedText} = this.state;
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
                imageScr={'http://localhost:4444/images/uploads/aidar/yyvphxs1ikqoims6/original.png'}
            />
          </Layer>
          <Layer>
          {rectangles.map((rect, i) => {
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
