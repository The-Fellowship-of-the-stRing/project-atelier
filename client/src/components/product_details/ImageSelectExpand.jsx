import React from 'react';
import ImageExpand from './ImageExpand.jsx';

const ImageSelectExpand = ({
  style,
  handleIndex,
  currentIndex,
  lowIndex,
  highIndex,
}) => (
  style.photos.map((value, index) => (
    <ImageExpand
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
export default ImageSelectExpand;
