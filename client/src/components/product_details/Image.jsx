import React from 'react';

const Image = ({
  thumbnail, handleIndex, index, currentIndex, lowIndex, highIndex,
}) => ((lowIndex <= index && highIndex > index) ? (
  <div>
    {currentIndex !== index && <img className="g-image_select" src={thumbnail} onClick={() => handleIndex(index)} alt="unselected item thumbnail" />}
    {currentIndex === index && <img className="g-image_selected" src={thumbnail} onClick={() => handleIndex(index)} alt="selected item thumbnail" />}
  </div>
)
  : <div />);
export default Image;
