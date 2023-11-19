import React from 'react';
import { AiOutlineClose } from "react-icons/ai";

import "../../stylesheets/ratings_review/addReview.css"

const AddReview = ({handleModal}) => {

  return (
    <div className="l-add-review-overlay" onClick={() => handleModal()}>
      <div className="l-add-review-modal">
      <AiOutlineClose onClick={() => handleModal()} />
      Yay its a modal
      </div>
    </div>
  )
}

export default AddReview;
