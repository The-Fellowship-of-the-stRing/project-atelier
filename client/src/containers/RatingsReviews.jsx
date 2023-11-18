import React from 'react';
import NumberReviews from '../components/ratings_review/NumberReviews.jsx'
import SortDropDown from '../components/ratings_review/SortDropDown.jsx'
import ReviewList from '../components/ratings_review/ReviewList.jsx'

import '../stylesheets/ratings_review/ratingsReview.css'

const RatingsReviews = ({itemId}) => {

  return (
    <div className="l-ratings-review-main-container">
      <NumberReviews itemId={itemId}/>
      <ReviewList itemId={itemId}/>
    </div>
  )
}

export default RatingsReviews