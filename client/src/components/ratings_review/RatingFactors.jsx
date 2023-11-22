import React, {useState, useEffect} from 'react';
import { GoTriangleDown } from "react-icons/go";

import '../../stylesheets/ratings_review/ratingFactors.css'


const RatingFactors = ({totals}) => {
  /*
  NOTES FOR LUKE:
  - Please consider cases where not all data is provided.
  - REPO: In related section, click on the white "YEazy 350" (itemId: 40351)
  */
  const [categories, setCategories] = useState([])

  const options = {
    "Size": ["Too small", "Perfect", "Too Large"],
    "Width": ["Too narrow", "Perfect", "Too Wide"],
    "Comfort": ["Poor", "Ok", "Perfect"],
    "Quality": ["Poor", "Ok", "Perfect"],
    "Length": ["Runs short", "Perfect", "Runs long"],
    "Fit": ["Runs tight", "Perfect", "Runs long"]
  }

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
        if (totals.characteristics[factor]) {
          const data = totals.characteristics[factor]
          const catRating = data.value;
          const markerLocation = (catRating / 5) * 100
          const subText = options[factor]
          return (
            <div key={data.id} className="l-rating-factors-single">
            <div className="l-rating-factors-cat">
            {factor}
            </div>
            <div className="l-rating-back-container">
              <div className="l-rating-back-bar"><span className="l-rating-sub-left">{subText[0]}</span></div>
              <div className="l-rating-back-bar"><span className="l-rating-sub-mid">{subText[1]}</span></div>
              <div className="l-rating-back-bar"><span className="l-rating-sub-right">{subText[2]}</span></div>
            <GoTriangleDown className="l-rating-marker" style={{left: `${markerLocation}%`}}/>
            </div>
          </div>
        )
      }
      })}
    </div>
  )
}

export default RatingFactors;