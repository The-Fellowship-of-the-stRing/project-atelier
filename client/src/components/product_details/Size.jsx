import React from 'react';

const Size = ({
  sku, handleSku,
}) => (sku[1].quantity > 0 ? (
  <option onChange={handleSku} value={sku[0]}>{sku[1].size}</option>
)
  : <option />);
export default Size;
