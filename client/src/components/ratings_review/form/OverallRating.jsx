import React from 'react';
import AddFormStars from '../AddFormStars.jsx';

const OverallRating = ({ overall, updateRating, ratingDef }) => {
  <div className="l-add-review-section-title">
    Overall Rating
    <div className="l-add-review-stars">
      <AddFormStars rating={overall} updateRating={updateRating} />
      <span style={{ marginLeft: '10px' }}>{ratingDef}</span>
    </div>
  </div>;
};

export default OverallRating;
