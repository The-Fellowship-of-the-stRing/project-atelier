import React from 'react';

const Summary = ({ summary, handleSummary }) => (
  <label htmlFor="summary-body" className="l-add-review-section-title">
    Review Summary (optional)
    <input id="summary-body" type="text" className="l-add-review-summary" value={summary} placeholder="Example: Best purchase ever!" onChange={(e) => handleSummary(e)} />
  </label>
);

export default Summary;
