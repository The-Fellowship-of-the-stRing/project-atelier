import React from 'react';

const Style = ({ thumbnail, handleStyle, index }) => (
  <img className="g-style_image" src={thumbnail} onClick={() => handleStyle(index)} />
);
export default Style;
