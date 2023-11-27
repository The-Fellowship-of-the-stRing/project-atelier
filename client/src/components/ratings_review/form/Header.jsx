import React from 'react';

const Header = ({ itemName }) => (
  <div className="l-add-review-header">
    <h1>Write Your Review</h1>
    <h3>
      About the
      {' '}
      {itemName}
    </h3>
  </div>
);

export default Header;
