import React, { useState, useEffect } from 'react';
import Stars from '../stars/Stars.jsx';
import getReviewMeta from '../../utils/getReviewMeta.js';
import '../../stylesheets/product_details/reviews.css';

import handleRef from '../../utils/handleRef.js';

const Reviews = ({ itemId, reviewRef }) => {
  const [reviewCount, setReviewCount] = useState(null);
  useEffect(() => {
    let count = 0;
    const fetchCount = async () => {
      const data = await getReviewMeta(itemId);
      const dataArray = Object.values(data.ratings);
      dataArray.forEach((value) => {
        count += parseInt(value, 10);
      });
      setReviewCount(count);
    };
    fetchCount();
  }, []);
  return reviewCount > 0 ? (
    <div className="g-reviews">
      <Stars itemId={itemId} />
      <button type="button" id="g-review-scroll" onClick={() => handleRef(reviewRef)}>
        {reviewCount}
        {' '}
        reviews
      </button>
    </div>
  )
    : <div />;
};
export default Reviews;
