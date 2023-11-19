import React from 'react';
import {useState,useEffect} from 'react';
import Cart from '../components/product_details/Cart.jsx';
import Reviews from '../components/product_details/Reviews.jsx';
import SocialMedia from '../components/product_details/SocialMedia.jsx';
import StyleList from '../components/product_details/StyleList.jsx';
import ImageGallery from '../components/product_details/ImageGallery.jsx';
import '../stylesheets/product_details/productDetails.css';
const ProductDetails = ({itemId}) => {
  return(
    <div className= "g-product-details-main-container">
      <div className = "g-product-details-column1">
        <ImageGallery/>
      </div>
      <div className="g-product-details-column2">
        <Reviews/>
        Information
        <StyleList/>
        <Cart/>
        <SocialMedia/>
      </div>
    </div>
  )
}
export default ProductDetails