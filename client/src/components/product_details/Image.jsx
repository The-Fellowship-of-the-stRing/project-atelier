import React from 'react';

const Image = ({
  thumbnail, handleIndex, index, currentIndex, lowIndex, highIndex,
}) => ((lowIndex <= index && highIndex > index) ? (
  <div>
    {currentIndex !== index && <div onKeyDown={() => handleIndex(index)} onClick={() => handleIndex(index)} role="button" tabIndex={index}><img className="g-image_select" src={thumbnail} alt="unselected item thumbnail" /></div>}
    {currentIndex === index && <div onKeyDown={() => handleIndex(index)} onClick={() => handleIndex(index)} role="button" tabIndex={index}><img className="g-image_selected" src={thumbnail} alt="unselected item thumbnail" /></div>}
  </div>
)
  : <div />);
export default Image;
