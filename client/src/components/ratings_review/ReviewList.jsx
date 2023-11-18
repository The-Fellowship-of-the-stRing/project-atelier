import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SortDropDown from './SortDropDown.jsx';
import ReviewTile from './ReviewTile.jsx'

import getReviews from '../../utils/getReviews.js'
import markHelpful from '../../utils/markHelpful.js'
import reportReview from '../../utils/reportReview.js'

import '../../stylesheets/ratings_review/reviewList.css'

const ReviewList = ({itemId}) => {
  const [sort, setSort] = useState('relevance')
  const [results, setResults] = useState([]);
  const [currentCount, setCurrentCount] = useState(10);
  const [resultsToShow, setResultsToShow] = useState([]);
  const [currentView, setCurrentView] = useState(2);

  const handleSort = async (e) => {
    setSort(e.target.value);
  }

  const handleViewMore = async () => {
    const newView = currentView + 2;
    if (newView === currentCount) {
      try {
        const response = await getReviews(itemId, sort, (currentCount + 10))
        setCurrentCount(currentCount + 10);
        setResults(response.results);
      } catch (err) {
        console.error('An error occured when getting more reviews: ', err);
      }
    }
    setCurrentView(newView)
  }

  const handleHelpful = async (id) => {
    try {
      const update = await markHelpful(id);
      const getUpdates = await getReviews(itemId, sort, currentCount)
      setResults(getUpdates.results)
    } catch (err) {
      console.error(err)
    }
  }

  const handleReport = async (id) => {
    try {
      const update = await reportReview(id);
      const getUpdates = await getReviews(itemId, sort, currentCount)
      setResults(getUpdates.results)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReviews(itemId, sort, currentCount)
        setResults(response.results);
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  },[sort])

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