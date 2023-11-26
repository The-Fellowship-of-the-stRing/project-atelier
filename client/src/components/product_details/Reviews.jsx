import React from 'react'
import Stars from '../stars/Stars.jsx'

const Reviews = ({itemId}) => {
  return(
    <div className="g-reviews">
      <Stars itemId ={itemId}/>
      Reviews
    </div>
  )
}
export default Reviews