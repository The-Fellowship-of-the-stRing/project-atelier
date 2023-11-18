import React from 'react'
import Stars from './Stars.jsx'

import '../../stylesheets/ratings_review/reviewTile.css'

const ReviewTile = ({review}) => {
  const date = new Date(review.date)

  const formattedDate = date.toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

  return (
    <div className="l-review-tile-single">
      <div className="l-review-tile-header">
        <Stars rating={review.rating} />
        <div className="l-review-tile-reviewer-name-date">
            {review.reviewer_name}, {formattedDate}
        </div>
      </div>
      <div className="l-review-tile-summary">
        {review.summary}
      </div>
      <div className="l-review-tile-body">
        {review.body}
      </div>
      <div className="l-review-tile-helpfulness">
        Helpful? <span className="l-review-tile-yes">Yes</span> ({review.helpfulness})
      </div>
    </div>
  )
}

export default ReviewTile