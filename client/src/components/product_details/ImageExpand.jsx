import React from 'react';

const ImageExpand = ({
  thumbnail, handleIndex, index, currentIndex, lowIndex, highIndex,
}) => ((lowIndex <= index && highIndex > index) ? (
  <div>
    {currentIndex !== index && (
    <div onKeyDown={() => handleIndex(index)} onClick={() => handleIndex(index)} role="button" tabIndex={index}>
      <img
        className="g-image_select-expand"
        src={thumbnail}
        alt="unselected item thumbnail"
      />
    </div>
    )}
    {currentIndex === index && (
    <div onKeyDown={() => handleIndex(index)} onClick={() => handleIndex(index)} role="button" tabIndex={index}>
      <img
        className="g-image_selected-expand"
        src={thumbnail}
        alt="unselected item thumbnail"
      />
    </div>
    )}
  </div>
)
  : <div />);
export default ImageExpand;
