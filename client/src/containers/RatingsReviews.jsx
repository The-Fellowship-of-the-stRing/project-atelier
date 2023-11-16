import React from 'react';
import NumberReviews from '../components/ratings_review/NumberReviews.jsx'
import SortDropDown from '../components/ratings_review/SortDropDown.jsx'
import ReviewTile from '../components/ratings_review/ReviewTile.jsx'

import '../stylesheets/ratings_review/ratingsReview.css'

const RatingsReviews = ({item}) => {

  return (
    <div className="ratings-review-main-container">
      <NumberReviews item={item}/>
      <SortDropDown item={item}/>
      <ReviewTile item={item}/>
    </div>
  )
}

export default RatingsReviews