import React, { Component } from 'react';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Star, Rect, Text } from 'react-konva';
import TextImage from './TextImage';
import Rectangle from "./Rectangle";

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    stroke: 'red',
    strokeWidth: 4,
    fill: 'transparent',
    id: 'rect1'
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    stroke: 'red',
    strokeWidth: 4,
    fill: 'transparent',
    id: 'rect2'
  }
];

class Mapper extends Component {
  state = {
    rectangles: initialRectangles,
    selectedId: null
  }

  selectShape(vSelectedId) {
      this.setState({selectedId: vSelectedId})
  }

  setRectangles(rectangles) {
      this.setState({rectangles: rectangles})
  }

  checkDeselect(e) {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
        this.selectShape(null)
    }
  }

  render() {
    const {rectangles, setRectangles, selectedId, selectShape} = this.state;
    return (
      <Stage width="800" height="800"
        onMouseDown={this.checkDeselect}
        onTouchStart={this.checkDeselect}
      >
        <Layer>
          <TextImage />
        </Layer>
        <Layer>
        {rectangles.map((rect, i) => {
          return (
            <Rectangle
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                  this.selectShape(rect.id);
                }}
                onChange={newAttrs => {
                  const rects = rectangles.slice();
                  rects[i] = newAttrs;
                  this.setRectangles(rects);
                }}
            />
          );
        })}
        </Layer>
      </Stage>
    );
  }
}
export default Mapper;
