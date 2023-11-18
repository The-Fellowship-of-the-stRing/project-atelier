import React, {useState, useEffect} from 'react';
import { GoTriangleDown } from "react-icons/go";


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
        return (
          <div key={data.id}>
            <div className="l-rating-factors-cat">
            {factor}
            </div>
            <div className="l-rating-back-container">
              <div className="l-rating-back-bar" />
              <div className="l-rating-back-bar" />
              <div className="l-rating-back-bar" />
            </div>
            <GoTriangleDown />
          </div>
        )
      })}
    </div>
  )
}

export default RatingFactors;