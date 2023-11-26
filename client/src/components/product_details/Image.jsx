import React from 'react';

const Image = ({ thumbnail, handleImage, index }) => (
  <button type="button" onClick={() => handleImage(index)}>
    <img className="g-image_select" src={thumbnail} alt="item Image" />
  </button>
);
export default Image;
