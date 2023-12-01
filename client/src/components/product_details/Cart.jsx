import React, { useState } from 'react';
import QuantityDropdown from './QuantityDropdown.jsx';
import SizeDropdown from './SizeDropdown.jsx';
import '../../stylesheets/product_details/cart.css';

const Cart = ({ style }) => {
  const [sku, setSku] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const handleSku = (e) => {
    setSku(e.target.value);
  };
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };
  return style ? (
    <div className="g-cart">
      <div className="g-dropdowns">
        <SizeDropdown style={style} handleSku={handleSku} />
        <QuantityDropdown style={style} handleQuantity={handleQuantity} sku={sku} />
      </div>
      <button className="g-cart-button" type="button"> Add to Cart </button>
    </div>
  ) : <div />;
};
export default Cart;
