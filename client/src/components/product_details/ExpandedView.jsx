import '../../stylesheets/product_details/expandedView.css';
import React, { useEffect, useState } from 'react';
import ImageSelectExpand from './ImageSelectExpand.jsx';

const ExpandedView = ({
  style, handleIndex, handlePage, currentIndex, lowIndex, highIndex,handleModalFalse
}) => (
  <div className="g-expanded-overlay">
    <div className="g-expanded-modal">
      <ImageSelectExpand
        style={style}
        handleIndex={handleIndex}
        currentIndex={currentIndex}
        handlePage={handlePage}
        lowIndex={lowIndex}
        highIndex={highIndex}
      />
      <button onClick={handleModalFalse} type="button"> Exit Expanded View </button>
    </div>
  </div>
);
export default ExpandedView;
