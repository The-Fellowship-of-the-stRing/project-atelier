import React from 'react';
import '../../stylesheets/product_details/styleList.css';
import StyleGallery from './StyleGallery.jsx';

const StyleList = ({ styles, style, handleStyle }) => (style ? (
  <div className="g-styleList">
    Selected Style:
    {' '}
    <span style={{ color: '#3DDC97' }}>{style.name}</span>
    <div className="g-styleGallery">
      <StyleGallery styles={styles} handleStyle={handleStyle} />
    </div>
  </div>
)
  : (
    <>
      No styles
    </>
  ));
export default StyleList;
