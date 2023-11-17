import React, {useState} from 'react'
import SortDropDown from './SortDropDown.jsx'

const ReviewList = ({item}) => {
  const [sort, setSort] = useState('relevant')
  const [results, setResults] = useState([]);

  const handleSort = (e) => {
    setSort(e.target.value);
  }

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