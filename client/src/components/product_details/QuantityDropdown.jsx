import React from 'react';
import Quantity from './Quantity.jsx';

const QuantityDropdown = ({ style, handleQuantity, sku }) => {
  const data = style.skus[sku];
  const quantityList = [];
  if (data) {
    for (let i = 1; i < data.quantity && i <= 15; i += 1) {
      quantityList.push(i);
    }
  }
  return data ? (
    <select onChange={handleQuantity} className="g-size-drop-down">
      <option value={null} selected>Select Quantity</option>
      {quantityList.map((quantity) => (
        <Quantity key={data.size + quantity} quantity={quantity} />
      ))}
    </select>
  )
    : (
      <select>
        <option value="Select Size First" disabled selected> Select Size First</option>
      </select>
    );
};

export default QuantityDropdown;
