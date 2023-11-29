import React, { useState, useEffect } from 'react';
import getProductDataById from '../utils/getProductDataById.js';
import getStyleDataById from '../utils/getStyleDataById.js';
import Cart from '../components/product_details/Cart.jsx';
import Reviews from '../components/product_details/Reviews.jsx';
import SocialMedia from '../components/product_details/SocialMedia.jsx';
import StyleList from '../components/product_details/StyleList.jsx';
import ImageGallery from '../components/product_details/ImageGallery.jsx';
import '../stylesheets/product_details/productDetails.css';

const ProductDetails = ({ itemId, handleRef }) => {
  const [data, setData] = useState(null);
  const [styles, setStyles] = useState([]);
  const [style, setStyle] = useState(null);
  const [price, setPrice] = useState(null);
  const [isSale, setIsSale] = useState(false);
  const [salePrice, setSalePrice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductDataById(itemId);
        const styleData = await getStyleDataById(itemId);
        // Leaving console.logs in comments for when I need to reference it
        console.log(productData);
        console.log(styleData);
        const values = {};
        values.name = productData.name;
        values.slogan = productData.slogan;
        values.description = productData.description;
        values.category = productData.category;
        setData(values);
        await setStyles(styleData);
      } catch (err) {
        console.error('Error getting item details: ', err);
      }
    };
    fetchData();
  }, [itemId]);
  useEffect(() => {
    let def = false;
    for (let i = 0; i < styles.length; i += 1) {
      if (styles[i]['default?'] === true) {
        setStyle(styles[i]);
        setPrice(styles[i].original_price);
        if (styles[i].sale_price) {
          setIsSale(true);
          setSalePrice(styles[i].sale_price);
        }
        def = true;
      }
    }
    if (def === false && styles.length > 1) {
      setStyle(styles[0]);
      setPrice(styles[0].original_price);
      if (styles[0].sale_price) {
        setIsSale(true);
        setSalePrice(styles[0].sale_price);
      }
    }
  }, [styles]);

  const handleStyle = (value) => {
    setStyle(styles[value]);
    setPrice(styles[value].original_price);
    if (styles[value].sale_price) {
      setIsSale(true);
      setSalePrice(styles[value].sale_price);
    } else {
      setIsSale(false);
    }
  };
  return data && styles ? (
    <div className="g-product-details-main-container">
      <div className="g-product-details-column1">
        <ImageGallery style={style} />
      </div>
      <div className="g-product-details-column2">
        <Reviews itemId={itemId} handleRef={handleRef} />
        <div className="g-product-details-info">
          <div>{data.category}</div>
          <div>{data.name}</div>
          <div>{data.slogan}</div>
          { isSale === true && (
          <div className="g-product-details-price">
            <div className="g-product-details-sale">
              $
              {price}
            </div>
            <div>
              &nbsp;
              $
              {salePrice}
            </div>
          </div>
          )}
          { isSale === false && (
          <div>
            <div>
              $
              {price}
            </div>
          </div>
          )}
        </div>
        <StyleList styles={styles} style={style} handleStyle={handleStyle} />
        <Cart style={style} />
        <SocialMedia />
        {data.description}
      </div>
    </div>
  )
    : (
      <div>
        Loading...
      </div>
    );
};
export default ProductDetails;
