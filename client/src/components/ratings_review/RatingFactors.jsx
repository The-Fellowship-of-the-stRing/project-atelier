import React, {useState, useEffect} from 'react';
import { GoTriangleDown } from "react-icons/go";

import '../../stylesheets/ratings_review/ratingFactors.css'


const RatingFactors = ({totals}) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (totals) {
      const obj = totals.characteristics
      const keys = []
      for (let key in obj) {
        keys.push(key)
      }
      setCategories(keys)
    }
  },[totals])

  return totals && (
    <div className="l-rating-factors-main">
      {categories.map((factor) => {
        const data = totals.characteristics[factor]
        const catRating = Number.parseInt(data.value);
        const markerLocation = (catRating / 5) * 100
        console.log(catRating)
        return (
          <div key={data.id}>
            <div className="l-rating-factors-cat">
            {factor}
            </div>
            <div className="l-rating-back-container">
              <div className="l-rating-back-bar" />
              <div className="l-rating-back-bar" />
              <div className="l-rating-back-bar" />
            <GoTriangleDown className="l-rating-marker" style={{left: `${markerLocation}%`}}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RatingFactors;