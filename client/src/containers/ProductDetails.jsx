import React from 'react';
import {useState,useEffect} from 'react';
import getProductDataById from '../utils/getProductDataById.js';
import getStyleDataById from '../utils/getStyleDataById.js';
import Cart from '../components/product_details/Cart.jsx';
import Reviews from '../components/product_details/Reviews.jsx';
import SocialMedia from '../components/product_details/SocialMedia.jsx';
import StyleList from '../components/product_details/StyleList.jsx';
import ImageGallery from '../components/product_details/ImageGallery.jsx';
import '../stylesheets/product_details/productDetails.css';
const ProductDetails = ({itemId,handleRef}) => {
  const [data, setData] = useState(null);
  const [styles, setStyles] = useState([]);
  const [style, setStyle] = useState(null);
  const [price, setPrice] = useState(null);
  const [isSale, setIsSale] = useState(false);
  const [sku, setSku] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductDataById(itemId);
        const styleData = await getStyleDataById(itemId);
        //Leaving console.logs in comments for when I need to reference it
        // console.log(productData);
        // console.log(styleData);
        const values = {};
        values.name = productData.name;
        values.slogan = productData.slogan;
        values.description = productData.description;
        values.category= productData.category;
        setData(values);
        await setStyles(styleData);
      } catch (err) {
        console.error('Error getting item details: ', err);
      }
    }
    fetchData();
  }, [itemId]);
  useEffect(()=> {
    var def = false;
    for(let x of styles) {
      if(x["default?"]=== true) {
        setStyle(x);
        def = true;
      }
    }
    if(def===false) {
      setStyle(styles[0]);
    }
  },[styles])
  const handlePrice = () => {

  }
  const handleStyle = (value) => {
    setStyle(styles[value]);
  }
  return data&&styles? (
    <div className= "g-product-details-main-container">
      <div className = "g-product-details-column1">
        <ImageGallery itemId = {itemId} style={style}/>
      </div>
      <div className="g-product-details-column2">
        <Reviews itemId = {itemId} handleRef={handleRef}/>
        <div className="g-product-details-info">
          <div>{data.category}</div>
          <div>{data.name}</div>
          <div>{data.slogan}</div>
        </div>
        <StyleList itemId = {itemId} styles= {styles} style ={style} handleStyle ={handleStyle}/>
        <Cart itemId = {itemId}/>
        <SocialMedia itemId = {itemId}/>
        {data.description}
      </div>
    </div>
  )
  : (
    <div>
      Loading...
    </div>
  )
}
export default ProductDetails