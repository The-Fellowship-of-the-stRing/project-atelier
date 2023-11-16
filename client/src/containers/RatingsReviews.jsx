import React from 'react';
import NumberReviews from '../components/ratings_review/NumberReviews.jsx'
import SortDropDown from '../components/ratings_review/SortDropDown.jsx'
import ReviewTile from '../components/ratings_review/ReviewTile.jsx'

import '../stylesheets/ratings_review/ratingsReview.css'

const RatingsReviews = ({currentItem}) => {

  return (
    <div className="ratings-review-main-container">
      {/* <NumberReviews item={currentItem}/>
      <SortDropDown item={currentItem}/>
      <ReviewTile item={currentItem}/> */}
    </div>
  )
}

export default RatingsReviews