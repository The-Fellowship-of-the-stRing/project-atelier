import React, {useState, useEffect} from 'react';
import getItemDetails from '../../utils/getItemDetails.js'

import "../../stylesheets/stars/stars.css"

const Stars = ({itemId}) => {
  const [ratingDisplay, setRatingDisplay] = useState(0)

  const roundRating = (value) => {
    const prevDec = (value % 1) * 100
    const newDec = Math.floor((prevDec + 12.5)/25) * .25
    const prevWholeNum = Math.floor(value)
    return prevWholeNum + newDec
  }

  const calcWidth = (rating) => {
    return rating * 10;
  }
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const getAverage = await getItemDetails(itemId)
        const averageRating = await roundRating(getAverage);
        setRatingDisplay(averageRating);
      } catch (err) {
        console.error('Error getting item details: ', err);
      }
    }

    fetchDetails();
  }, [itemId])

  return (
    <div id="stars-main-container">
      <div id="stars-outline-container">
        <span>&#9734;</span><span>&#9734;</span><span>&#9734;</span><span>&#9734;</span><span>&#9734;</span>
      </div>
      <div id="stars-filled-container" style={{width: `${ratingDisplay * 20}%`}}>
        <span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span>
      </div>
    </div>
  )
}

export default Stars