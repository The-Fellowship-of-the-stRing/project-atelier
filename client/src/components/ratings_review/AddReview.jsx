import React from 'react';
import { AiOutlineClose } from "react-icons/ai";

import "../../stylesheets/ratings_review/addReview.css"

const AddReview = ({handleModal}) => {

  return (
    <div className="l-add-review-overlay">
      <div className="l-add-review-modal" >
      <AiOutlineClose className="l-add-review-close" onClick={() => handleModal()} />
      Yay its a modal
      </div>
    </div>
  )
}

export default AddReview;
