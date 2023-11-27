import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa6';
import Stars from './Stars.jsx';

import '../../stylesheets/ratings_review/reviewTile.css';

const ReviewTile = ({ review, handleHelpful, handleReport }) => {
  const [body, setBody] = useState(review.body);
  const [showMore, setShowMore] = useState(false);
  const [markedHelp, setMarkedHelp] = useState(false);
  const date = new Date(review.date);

  const formatContent = () => {
    if (body.length > 250) {
      let formatBody = review.body.slice(0, 250);
      formatBody += '...';
      setShowMore(true);
      setBody(formatBody);
    }
  };

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleShowMore = () => {
    setShowMore(false);
    setBody(review.body);
  };

  const handleMark = () => {
    if (!markedHelp) {
      setMarkedHelp(true);
      handleHelpful(review.review_id);
    }
  };

  useEffect(() => {
    formatContent();
  }, []);

  return (
    <div className="l-review-tile-single">
      <div className="l-review-tile-header">
        <Stars rating={review.rating} />
        <div className="l-review-tile-reviewer-name-date">
          {review.reviewer_name}
          ,
          {' '}
          {formattedDate}
        </div>
      </div>
      <div className="l-review-tile-summary">
        {review.summary}
      </div>
      <div className="l-review-tile-body" data-testid="review-body">
        {body}
        {' '}
        <span
          role="button"
          tabIndex="0"
          onKeyDown={() => handleShowMore()}
          className="l-review-tile-show-more"
          data-testid="show-more"
          onClick={() => handleShowMore()}
          hidden={!showMore}
        >
          Show More
        </span>
      </div>
      {review.recommend && (
        <div>
          <FaCheck />
          {' '}
          I recommend this product
        </div>
      )}
      {review.response && (
        <div className="l-review-tile-response">
          <b>Response: </b>
          <p style={{ height: 'fit-content', margin: '0px', marginTop: '10px' }}>{review.response}</p>
        </div>
      )}
      {review.photos.length > 0 && (
        <div className="l-review-tile-photos">
          {review.photos.map((img) => (
            <div key={img.id} className="l-review-tile-thumb" style={{ backgroundImage: `url(${img.url})` }} />
          ))}
        </div>
      )}
      <div className="l-review-tile-helpfulness">
        Helpful?
        {' '}
        <span
          role="button"
          tabIndex="0"
          onKeyDown={() => handleMark()}
          className="l-review-tile-yes"
          data-testid="helpfull-button"
          style={{ cursor: !markedHelp ? 'pointer' : 'default' }}
          onClick={() => handleMark()}
        >
          Yes
        </span>
        {' '}
        (
        {review.helpfulness}
        )  |
        {' '}
        <span
          role="button"
          tabIndex="0"
          onKeyDown={() => handleReport(review.review_id)}
          className="l-review-tile-report"
          onClick={() => handleReport(review.review_id)}
        >
          Report
        </span>
      </div>
    </div>
  );
};

export default ReviewTile;
