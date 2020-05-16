import React from 'react';
import useImage from 'use-image';
import { Image } from 'react-konva';

const TextImage = () => {
  const [image] = useImage('http://localhost:4444/images/uploads/aidar/yyvphxs1ikqoims6/original.png');
  return <Image image={image} width={800} />;
};

export default TextImage;