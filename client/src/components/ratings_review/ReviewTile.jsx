import React from 'react'
import Stars from './Stars.jsx'

import '../../stylesheets/ratings_review/reviewTile.css'

const ReviewTile = ({review}) => {
  return (
    <div className="l-review-tile-main">
      <Stars rating={review.rating} />
      <div className="l-review-tile-summary">
        {review.summary}
      </div>
      <div className="l-review-tile-recommend">
        {review.date}
      </div>
      <div className="l-review-tile-body">
        {review.body}
      </div>
      <div className="l-review-tile-helpfulness">
        {review.helpfulness}
      </div>
    </div>
  )
}

export default ReviewTile