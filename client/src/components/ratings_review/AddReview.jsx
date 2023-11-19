import React, {useState} from 'react';
import { AiOutlineClose } from "react-icons/ai";

import AddFormStars from './AddFormStars.jsx'

import "../../stylesheets/ratings_review/addReview.css"

const AddReview = ({handleModal}) => {
  const [overall, setOverall] = useState(0)
  const [ratingDef, setRatingDef] = useState("")

  const options = ["Poor", "Fair", "Average", "Good", "Great"]

  const updateRating = (value) => {
    setOverall(value)
    setRatingDef(options[value - 1])
  }

  return (
    <div className="l-add-review-overlay">
      <div className="l-add-review-modal" >
      <AiOutlineClose className="l-add-review-close" onClick={() => handleModal()} />
        <form className="l-add-review-form" onSubmit={(e) => handleAddReview(e)}>
          <label>Overall Rating</label>
          <div className="l-add-review-stars"><AddFormStars rating={overall} updateRating={updateRating}/><span style={{marginLeft: "10px"}}>{ratingDef}</span></div>
          <label>Do you recommend?</label>
          <label>Characteristics</label>
          <label>Review Summary</label>
          <label>Review Body</label>
          <label>Upload your photos</label>
          <label>What is your nickname?</label>
          <label>Your email</label>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  )
}

export default AddReview;
