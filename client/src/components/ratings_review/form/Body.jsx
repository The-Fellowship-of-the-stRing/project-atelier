import React from 'react';

const Body = ({ formBody, handleBody, charCount }) => (
  <>
    <label htmlFor="add-review-body" className="l-add-review-section-title">
      Review Body
      <textarea id="add-review-body" type="text" className="l-add-review-body" value={formBody} placeholder="Why did you like the product or not?" onChange={(e) => handleBody(e)} />
    </label>
    <div className="l-add-review-body-count">{charCount <= 0 ? 'Minimum reached' : `Minimum required characters left: ${charCount}`}</div>
  </>
);

export default Body;
