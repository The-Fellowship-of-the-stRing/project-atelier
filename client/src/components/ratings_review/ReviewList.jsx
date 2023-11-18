import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SortDropDown from './SortDropDown.jsx';
import ReviewTile from './ReviewTile.jsx'



import '../../stylesheets/ratings_review/reviewList.css'

const ReviewList = ({
  sort,
  results,
  handleSort,
  handleHelpful,
  handleReport,
  currentView,
  currentCount,
  handleViewMore}) => {
  const [resultsToShow, setResultsToShow] = useState([]);

  useEffect(() => {
    setResultsToShow(results.slice(0, currentView))
  }, [results, currentView])

  return (
    <div className="l-review-list-main">
      <div className="l-review-list-header">
        {results.length > 0 ? results.length : "0"} reviews, sorted by <SortDropDown handleSort={handleSort} sort={sort}/>
      </div>
      {resultsToShow.length < 1 ? (
        <div>Please add a review</div>
      ):(
        <div className="l-review-list-container">
          {resultsToShow.map((review) => {
            return (
              <div key={review.review_id} className="l-review-list-tile-main">
                <ReviewTile review={review} handleHelpful={handleHelpful} handleReport={handleReport}/>
              </div>
            )
          })}
        </div>
      )}
      <button type="button" className="l-review-list-more-btn" onClick={() => handleViewMore()} hidden={resultsToShow.length >= results.length ? true : false}>MORE REVIEWS</button>
    </div>
  )
}

export default ReviewList