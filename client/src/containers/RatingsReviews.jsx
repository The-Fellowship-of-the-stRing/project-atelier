import React from 'react';
import NumberReviews from '../components/ratings_review/NumberReviews.jsx'
import SortDropDown from '../components/ratings_review/SortDropDown.jsx'
import ReviewList from '../components/ratings_review/ReviewList.jsx'

import '../stylesheets/ratings_review/ratingsReview.css'

const RatingsReviews = ({item}) => {

  return (
    <div className="ratings-review-main-container">
      <NumberReviews item={item}/>
      <ReviewList item={item}/>
    </div>
  )
}

export default RatingsReviews