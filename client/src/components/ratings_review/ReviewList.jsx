import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SortDropDown from './SortDropDown.jsx';
import ReviewTile from './ReviewTile.jsx'
import getReviews from '../../utils/getReviews.js'

const ReviewList = ({itemId}) => {
  const [sort, setSort] = useState('relevant')
  const [results, setResults] = useState([]);

  const handleSort = async (e) => {
    setSort(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReviews(itemId, sort)
        setResults(response.results);
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  },[sort])

  return (
    <div>
      <SortDropDown handleSort={handleSort} sort={sort}/>
      {results.length < 1 ? (
        <div>Please add a review</div>
      ):(
        <>
          {results.map((review) => {
            <div key={review.id}>
              <ReviewTile review={review} />
            </div>
          })}
        </>
      )}
    </div>
  )
}

export default ReviewList