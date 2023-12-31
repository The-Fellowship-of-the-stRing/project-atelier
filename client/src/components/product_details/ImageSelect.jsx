import React from 'react';
import Image from './Image.jsx';

const ImageSelect = ({
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
      <Image
        key={index}
        thumbnail={link}
        handleIndex={handleIndex}
        index={index}
        currentIndex={currentIndex}
        lowIndex={lowIndex}
        highIndex={highIndex}
      />
    );
  }));
export default ImageSelect;
