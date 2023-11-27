import React from 'react';

const Style = ({ thumbnail, handleStyle, index }) => (
  // <img className="g-style_image" src={thumbnail} onClick={() => handleStyle(index)} alt="style option" />
  <div
    role="button"
    className="g-style_image"
    tabIndex={index}
    style={{ padding: '10px', backgroundImage: `url(${thumbnail})` }}
    onKeyDown={() => handleStyle(index)}
    onClick={() => handleStyle(index)}
    alt="style option"
  />
);
export default Style;
