import React from 'react';
import Image from './Image.jsx';

const ImageSelect = ({
  style,
  handleIndex,
  currentIndex,
  lowIndex,
  highIndex,
}) => (
  style.photos.map((value, index) => (
    <Image
      key={value.thumbnail_url}
      thumbnail={value.thumbnail_url}
      handleIndex={handleIndex}
      index={index}
      currentIndex={currentIndex}
      lowIndex={lowIndex}
      highIndex={highIndex}
    />
  ))
);
export default ImageSelect;
