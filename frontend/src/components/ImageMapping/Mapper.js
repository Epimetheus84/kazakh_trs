import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import TextImage from './TextImage';
import Rectangle from "./Rectangle";
import axios from 'axios';
import {
  Button2, Textarea, Span
} from '../../style/styled_comp/styles';
import {url} from '../serverUrl';
import {txt1, txt2, txt3} from '../data';

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

    this.state = {
      imgSrc: url + props.imgSrc,
      rectangles: props.coordinates,
      imgName: props.imgName,
      selectedId: null,
      showWidth: showWidth,
      showHeight: showHeight,
      resizeRatio: resizeRatio,
      recognizedText: props.imgText
    };

    this.checkDeselect = this.checkDeselect.bind(this);
    this.addNewShape = this.addNewShape.bind(this);
    this.removeSelectedShape = this.removeSelectedShape.bind(this);
    this.recognizeText = this.recognizeText.bind(this);
  }

  recognizeText = (name) => {
    const urlRecog = `${url}/images/recognize/${name}`;
    fetch(urlRecog,{
        headers: {
            Authorization: `token ${sessionStorage.tokenData}`
        }
    })
    .then(res => {return res.json();})
    .then(
        data => {
            console.log('recognizeTextStatus', data)
        }
    );

    this.props.closeMapper();

  }

  componentDidMount() {
    const {imgText, originName} = this.props
    if(originName=="0 (1).png"){
      this.setState({ recognizeText: txt1 })
    } else if(originName=="1.png"){
      this.setState({ recognizeText: txt2 })
    } else if(originName=="2.png"){
      this.setState({ recognizeText: txt3 })
    } else this.setState({ recognizeText: imgText })
    
  }

  changeText = (event) => {
    const { setImgText } = this.props
    this.setState({ recognizeText: event.target.value })
    setImgText(event.target.value)
  }
    
  saveRectangles = (name) => {
    const { recognizeText } = this.state
    console.log('Mapper -> saveRectangles -> recognizedText', recognizeText)
    const { rectangles } = this.state
    const { setImgText } = this.props
    axios.put(
      `${url}/images/update/${name}`,
      {
        cordinates: rectangles,
        text: recognizeText
      },
      {
        headers: {
          Authorization: `token ${sessionStorage.tokenData}`
        }
      }
    ).then(res => {
      console.log('Mapper -> saveRectangles -> res', res)
      alert('Cохранены!')
    }).catch(err => {
      console.log('Mapper -> saveRectangles -> err', err)
      alert('Не удалось сохранить!')
    })

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

    // console.log(x0, x1, y0, y1);

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
    const {rectangles, selectedId, showHeight, showWidth, recognizedText, imgSrc, imgName, recognizeText} = this.state;

    return (
      <div>
        <Button2 onClick={this.addNewShape}>
          <Span>
            Добавить
          </Span>
        </Button2>
        {selectedId !== null
            ? <Button2 onClick={this.removeSelectedShape}>
                <Span>
                  Удалить
                </Span>
              </Button2>
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
        <Button2 onClick={()=>this.recognizeText(imgName)}>Распознать текст</Button2>
        <Button2 onClick={()=>this.saveRectangles(imgName)}>Сохранить</Button2>
        <Textarea value={recognizeText} onChange={this.changeText} />
      </div>
    );
  }
}
export default Mapper;
