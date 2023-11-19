import React, {useState, useEffect} from 'react';

import Stars from '../stars/Stars.jsx'
import StarBar from '../ratings_review/StarBar.jsx'

import getItemDetails from '../../utils/getItemDetails.js';
import getReviews from '../../utils/getReviews.js'

import '../../stylesheets/ratings_review/ratingBreakdown.css';

const RatingBreakdown = ({itemId, results, totals, updateFilter, currentFilter}) => {
  const [avgRating, setAvgRating] = useState('');
  const [percentGood, setPercentGood] = useState(0)
  const [totalReviews, setTotalReviews] = useState(null)

  const roundRating = (value) => {
    const prevDec = (value % 1) * 100;
    const newDec = Math.floor((prevDec + 12.5)/25) * .25;
    const prevWholeNum = Math.floor(value);
    return prevWholeNum + newDec;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getItemDetails(itemId);
        const rounded = roundRating(response);
        setAvgRating(rounded.toFixed(1));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  },[itemId]);

  useEffect(() => {
    if (totals) {
      const yesNum = Number.parseInt(totals.recommended.true)
      const noNum = Number.parseInt(totals.recommended.false)
      const calcYes = Math.floor(yesNum / (noNum + yesNum) * 100)
      setPercentGood(calcYes)

      const ratings = totals.ratings
      let counter = 0
      for (let key in ratings) {
        counter = counter + Number.parseInt(ratings[key])
      }
      setTotalReviews(counter)
    }
  },[totals])

  return (
    <div className="l-rating-bd-main">
      <p className="l-rating-bd-title">RATINGS & REVIEWS</p>
      <div className="l-rating-bd-score">
        <div className="l-rating-bd-number">{avgRating}</div>
        <Stars itemId={itemId} style={{height: '100%'}}/>
      </div>
      {totals && (
        <>
        <div className="l-rating-percent">
        {percentGood}% of reviews recommended this product
        </div>
        <div className="l-rating-bars-main">
          <StarBar value={totals.ratings["5"]} total={totalReviews} current="5" updateFilter={updateFilter}/>
          <StarBar value={totals.ratings["4"]} total={totalReviews} current="4" updateFilter={updateFilter}/>
          <StarBar value={totals.ratings["3"]} total={totalReviews} current="3" updateFilter={updateFilter}/>
          <StarBar value={totals.ratings["2"]} total={totalReviews} current="2" updateFilter={updateFilter}/>
          <StarBar value={totals.ratings["1"]} total={totalReviews} current="1" updateFilter={updateFilter}/>
        </div>
        <div className="l-rating-bars-filters">
          {currentFilter.length > 0 && (
            <>
              Total Stars {currentFilter.map((value, index) => {
                return index === currentFilter.length -1 ? `${value}` : `${value}, `
              })}
              <div className="l-rating-bars-remove" onClick={() => updateFilter([])}>
                Remove Filters
              </div>
              </>
            )}
        </div>
        </>
        )}
    </div>
  )
}

export default RatingBreakdown;