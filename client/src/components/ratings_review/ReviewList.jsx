import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import SortDropDown from './SortDropDown.jsx';
import ReviewTile from './ReviewTile.jsx';

import '../../stylesheets/ratings_review/reviewList.css';

const ReviewList = ({
  sort,
  results,
  handleSort,
  handleHelpful,
  handleReport,
  currentView,
  handleViewMore,
  currentFilter,
  handleModal,
}) => {
  const [resultsToShow, setResultsToShow] = useState([]);

  useEffect(() => {
    setResultsToShow(results.slice(0, currentView));
  }, [results, currentView]);

  return (
    <div className="l-review-list-main">
      <div className="l-review-list-header">
        {results.length > 0 ? results.length : '0'}
        {' '}
        reviews, sorted by
        {' '}
        <SortDropDown handleSort={handleSort} sort={sort} />
      </div>
      {resultsToShow.length < 1 ? (
        <div>Please add a review</div>
      ) : (
        <div className="l-review-list-container">
          {resultsToShow.map((review) => {
            if (currentFilter.indexOf(`${review.rating}`) !== -1 || currentFilter.length < 1) {
              return (
                <div data-testid="review-item" key={review.review_id} className="l-review-list-tile-main">
                  <ReviewTile
                    review={review}
                    handleHelpful={handleHelpful}
                    handleReport={handleReport}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
      <div className="l-review-list-btn-placement">
        <button type="button" className="l-review-list-more-btn" onClick={() => handleViewMore()} hidden={resultsToShow.length >= results.length}>
          MORE REVIEWS
          <div className="l-review-button-effect" />
        </button>
        <button data-testid="add-review-btn" type="button" className="l-review-list-more-btn" onClick={() => handleModal()}>
          ADD A REVIEW
          {' '}
          <FaPlus className="l-review-list-btn-icon" />
        </button>
      </div>
    </div>
  );
};

export default ReviewList;
