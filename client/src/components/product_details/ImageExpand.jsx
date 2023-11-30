import React from 'react';
import { FaRegCircle, FaCircle } from 'react-icons/fa6';

const ImageExpand = ({
  handleIndex, index, currentIndex, lowIndex, highIndex,
}) => ((lowIndex <= index && highIndex > index) ? (
  <div>
    {currentIndex !== index && (
    <div
      onKeyDown={() => handleIndex(index)}
      onClick={() => handleIndex(index)}
      role="button"
      tabIndex={index}
    >
      <FaRegCircle className="g-current-expanded-img-button" />
    </div>
    )}
    {currentIndex === index && (
    <div
      onKeyDown={() => handleIndex(index)}
      onClick={() => handleIndex(index)}
      role="button"
      tabIndex={index}
    >
      <FaCircle className="g-current-expanded-img-button" />

    </div>
    )}
  </div>
)
  : <div />);
export default ImageExpand;
