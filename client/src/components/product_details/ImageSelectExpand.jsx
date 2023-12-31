import React from 'react';
import ImageExpand from './ImageExpand.jsx';

const ImageSelectExpand = ({
  style,
  handleIndex,
  currentIndex,
  lowIndex,
  highIndex,
}) => (
  style.photos.map((value, index) => {
    let link = '';
    const key = index;
    if (value) {
      if (value.thumbnail_url) {
        link = value.thumbnail_url.slice(value.thumbnail_url.indexOf('http'));
      }
    }
    return (
      <ImageExpand
        key={key}
        thumbnail={link}
        handleIndex={handleIndex}
        index={index}
        currentIndex={currentIndex}
        lowIndex={lowIndex}
        highIndex={highIndex}
      />
    );
  }));
export default ImageSelectExpand;
