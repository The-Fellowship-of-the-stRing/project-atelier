import React, {useState} from 'react';
import { AiOutlineClose } from "react-icons/ai";

import AddFormStars from './AddFormStars.jsx'

import "../../stylesheets/ratings_review/addReview.css"

const AddReview = ({handleModal}) => {
  const [overall, setOverall] = useState(0)
  const [ratingDef, setRatingDef] = useState("")
  const [recommend, setRecommend] = useState("Yes")

  const options = ["Poor", "Fair", "Average", "Good", "Great"]

  const updateRating = (value) => {
    setOverall(value)
    setRatingDef(options[value - 1])
  }

  const onOptionChange = (e) => {
    setRecommend(e.target.value)
  }

  return (
    <div className="l-add-review-overlay">
      <div className="l-add-review-modal" >
      <AiOutlineClose className="l-add-review-close" onClick={() => handleModal()} />
        <div className="l-add-review-form">
          <div>Overall Rating
            <div className="l-add-review-stars">
              <AddFormStars rating={overall} updateRating={updateRating}/><span style={{marginLeft: "10px"}}>{ratingDef}</span>
            </div>
          </div>
          <div className="l-add-review-recommend">
            Do you recommend?
            <input
              type="radio"
              name="yes"
              value="Yes"
              id="l-add-review-yes"
              checked={recommend === "Yes"}
              onChange={onOptionChange}
              />
            <label>Yes</label>
            <input
              type="radio"
              name="no"
              value="No"
              id="l-add-review-no"
              checked={recommend === "No"}
              onChange={onOptionChange}
              />
            <label>No</label>
          </div>


          <label>Characteristics</label>
          <label>Review Summary</label>
          <label>Review Body</label>
          <label>Upload your photos</label>
          <label>What is your nickname?</label>
          <label>Your email</label>
          <button type="submit">SUBMIT</button>
        </div>
      </div>
    </div>
  )
}

export default AddReview;
