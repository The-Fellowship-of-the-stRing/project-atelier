import React, { useState, useEffect, useRef } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const listElementRef = useRef(null);

  const loadMoreReviews = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await handleViewMore();
    setIsLoading(false);
  };

  const handleScroll = (event) => {
    if (isLoading) return;
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    const buffer = 30;
    if (scrollTop + clientHeight >= scrollHeight - buffer) {
      loadMoreReviews();
    }
  };

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
        <div className="l-review-list-container" ref={listElementRef} onScroll={handleScroll}>
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
        <button data-testid="add-review-btn" type="button" className="l-review-list-more-btn" onClick={() => handleModal()}>
          ADD A REVIEW
          {' '}
          <FaPlus className="l-review-list-btn-icon" />
        </button>
        {isLoading && (
        <div className="scroll-loader" />
        )}
      </div>
    </div>
  );
};

export default ReviewList;
