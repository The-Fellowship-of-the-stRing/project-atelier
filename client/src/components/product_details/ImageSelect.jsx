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
    const link = value.thumbnail_url.slice(value.thumbnail_url.indexOf('http'));
    console.log(link);
    return (
      <Image
        key={link}
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
