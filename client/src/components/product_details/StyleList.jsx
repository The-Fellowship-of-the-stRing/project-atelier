import React,{useState,useEffect} from 'react';
import '../../stylesheets/product_details/styleList.css';
import StyleGallery from './StyleGallery.jsx';
const StyleList = ({itemId,styles,style, handleStyle}) => {
  return style? (
    <div className="g-styleList">
       Selected Style: {style.name}
       <div className= "g-styleGallery">
       <StyleGallery styles = {styles} handleStyle={handleStyle}/>
       </div>
    </div>
    ):
    <>
    No styles
    </>

}
export default StyleList