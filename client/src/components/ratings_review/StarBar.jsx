import React from 'react';

import '../../stylesheets/ratings_review/starBar.css';

const StarBar = ({
  value, total, current, updateFilter,
}) => (
  <div className="l-star-bar-main" data-testid="star-bar">
    <div
      role="button"
      tabIndex="0"
      onKeyDown={() => updateFilter(current)}
      className="l-star-bar-text"
      onClick={() => updateFilter(current)}
    >
      {current}
      {' '}
      stars
    </div>
    <div className="l-star-bar-container">
      <div className="l-star-bar-total" />
      <div className="l-star-bar-value" style={{ width: `${(value / total) * 100}%` }} />
    </div>
  </div>
);

export default StarBar;
