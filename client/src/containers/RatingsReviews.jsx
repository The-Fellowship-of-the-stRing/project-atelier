import React from 'react';
import SortDropDown from '../components/ratings_review/SortDropDown.jsx'
import ReviewList from '../components/ratings_review/ReviewList.jsx'
import RatingBreakdown from '../components/ratings_review/RatingBreakdown.jsx'

import '../stylesheets/ratings_review/ratingsReview.css'

const RatingsReviews = ({itemId}) => {

  return (
    <div className="ratings-review-main-container">
      <RatingBreakdown itemId={itemId} />
      <ReviewList itemId={itemId}/>
    </div>
  )
}

export default RatingsReviews