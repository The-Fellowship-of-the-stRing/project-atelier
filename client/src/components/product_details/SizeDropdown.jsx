import React from 'react';
import Size from './Size.jsx';

const SizeDropdown = ({ style, handleSku }) => {
  const skus = Object.entries(style.skus);
  return (
    <select onChange={handleSku} className="g-size-drop-down">
      <option value={null}>Select size</option>
      {skus.map((sku) => (
        <Size key={sku[0]} sku={sku} handleSku={handleSku} />
      ))}
    </select>
  );
};

export default SizeDropdown;
