import React from 'react';
import useImage from 'use-image';
import { Image } from 'react-konva';

const TextImage = ({ imageScr, showHeight, showWidth }) => {
  const [image] = useImage(imageScr);
  return <Image image={image} width={showWidth} height={showHeight} />;
};

export default TextImage;