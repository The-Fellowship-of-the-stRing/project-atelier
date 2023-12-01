import React from 'react';

const Style = ({ thumbnail, handleStyle, index }) => (
  <div
    role="button"
    className="g-style_image"
    tabIndex="0"
    style={{ padding: '10px', backgroundImage: `url(${thumbnail})` }}
    onKeyDown={() => handleStyle(index)}
    onClick={() => handleStyle(index)}
    alt="style option"
  />
);
export default Style;
