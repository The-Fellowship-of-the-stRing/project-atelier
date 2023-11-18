import React, {useState, useEffect} from 'react'
import Stars from './Stars.jsx'
import { FaCheck } from "react-icons/fa6";

import '../../stylesheets/ratings_review/reviewTile.css'

const ReviewTile = ({review, handleHelpful}) => {
  const [body, setBody] = useState(review.body)
  const [showMore, setShowMore] = useState(false)
  const [markedHelp, setMarkedHelp] = useState(false)
  const date = new Date(review.date)

  const formatContent = () => {
    if (body.length > 250) {
      let formatBody = review.body.slice(0, 250);
      formatBody = formatBody + '...';
      setShowMore(true)
      setBody(formatBody)
    }
  }

  const formattedDate = date.toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleShowMore = () => {
    setShowMore(false)
    setBody(review.body)
  }

  const handleMark = () => {
    if (!markedHelp) {
      setMarkedHelp(true)
      handleHelpful(review.review_id, (review.helpfulness + 1))
    }
  }

  useEffect(() => {
    formatContent()
  },[])

  return (
    <div className="l-review-tile-single">
      <div className="l-review-tile-header">
        <Stars rating={review.rating} />
        <div className="l-review-tile-reviewer-name-date">
            {review.reviewer_name}, {formattedDate}
        </div>
      </div>
      <div className="l-review-tile-summary">
        {review.summary}
      </div>
      <div className="l-review-tile-body">
        {body} <span className="l-review-tile-show-more" onClick={() => handleShowMore()} hidden={!showMore}>Show More</span>
      </div>
      {review.recommend && (
        <div>
          <FaCheck /> I recommend this product
        </div>
      )}
      <div className="l-review-tile-helpfulness">
        Helpful? <span className="l-review-tile-yes" style={{cursor: !markedHelp ? "pointer" : "default"}} onClick={() => handleMark()}>Yes</span> ({review.helpfulness})
      </div>
    </div>
  )
}

export default ReviewTile