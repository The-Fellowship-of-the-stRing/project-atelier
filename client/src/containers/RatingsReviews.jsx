import React, {useState, useEffect} from 'react';
import SortDropDown from '../components/ratings_review/SortDropDown.jsx'
import ReviewList from '../components/ratings_review/ReviewList.jsx'
import RatingBreakdown from '../components/ratings_review/RatingBreakdown.jsx'

import getReviews from '../utils/getReviews.js'
import markHelpful from '../utils/markHelpful.js'
import reportReview from '../utils/reportReview.js'
import getReviewMeta from '../utils/getReviewMeta.js'

import '../stylesheets/ratings_review/ratingsReview.css'

const RatingsReviews = ({itemId}) => {
  const [sort, setSort] = useState('relevance')
  const [results, setResults] = useState([]);
  const [currentCount, setCurrentCount] = useState(10);
  const [currentView, setCurrentView] = useState(2);
  const [totals, setTotals] = useState(null)

  const handleSort = async (e) => {
    setSort(e.target.value);
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
    const fetchData = async () => {
      try {
        const response = await getReviewMeta(itemId)
        setTotals(response);
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  },[itemId])

  return (
    <div className="ratings-review-main-container">
      <RatingBreakdown itemId={itemId} results={results} totals={totals}/>
      <ReviewList
      results={results}
      sort={sort}
      handleSort={handleSort}
      handleHelpful={handleHelpful}
      handleReport={handleReport}
      handleViewMore={handleViewMore}
      currentView={currentView}
      currentCount={currentCount}/>
    </div>
  )
}

export default RatingsReviews