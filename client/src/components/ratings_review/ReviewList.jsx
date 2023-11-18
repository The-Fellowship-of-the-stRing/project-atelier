import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SortDropDown from './SortDropDown.jsx';
import ReviewTile from './ReviewTile.jsx'
import getReviews from '../../utils/getReviews.js'

import '../../stylesheets/ratings_review/reviewList.css'

const ReviewList = ({itemId}) => {
  const [sort, setSort] = useState('relevant')
  const [results, setResults] = useState([]);
  const [currentCount, setCurrentCount] = useState(10);

  const handleSort = async (e) => {
    setSort(e.target.value);
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

  }, [results])

  return (
    <div className="l-review-list-main">
      <div>{results.length > 0 ? results.length : "0"} reviews, sorted by <SortDropDown handleSort={handleSort} sort={sort}/></div>
      {results.length < 1 ? (
        <div>Please add a review</div>
      ):(
        <div className="l-review-list-container">
          {results.map((review) => {
            return (
              <div key={review.review_id} className="l-review-list-tile-main">
                <ReviewTile review={review} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ReviewList