import React, {useState, useEffect} from 'react';

import Stars from '../stars/Stars.jsx'

import getItemDetails from '../../utils/getItemDetails.js';

import '../../stylesheets/ratings_review/ratingBreakdown.css';

const RatingBreakdown = ({itemId}) => {
  const [avgRating, setAvgRating] = useState('');

  const roundRating = (value) => {
    const prevDec = (value % 1) * 100;
    const newDec = Math.floor((prevDec + 12.5)/25) * .25;
    const prevWholeNum = Math.floor(value);
    return prevWholeNum + newDec;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getItemDetails(itemId);
        const rounded = roundRating(response);
        setAvgRating(rounded.toFixed(1));
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  },[itemId]);

  return (
    <div className="l-rating-bd-main">
      <p className="l-rating-bd-title">RATINGS & REVIEWS</p>
      <div className="l-rating-bd-score">
        <div className="l-rating-bd-number">{avgRating}</div>
        <Stars itemId={itemId} style={{height: '100%'}}/>
      </div>
    </div>
  )
}

export default RatingBreakdown;