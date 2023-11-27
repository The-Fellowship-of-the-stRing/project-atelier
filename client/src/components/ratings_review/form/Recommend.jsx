import React from 'react';

const Recommend = ({ recommend, onOptionChange }) => (
  <div className="l-add-review-recommend">
    <div
      className="l-add-review-section-title"
    >
      Do you recommend?
    </div>
    <label htmlFor="l-add-review-yes">
      <input
        type="radio"
        name="yes"
        value="Yes"
        id="l-add-review-yes"
        checked={recommend === 'Yes'}
        onChange={onOptionChange}
      />
      Yes
    </label>
    <label htmlFor="l-add-review-yes">
      <input
        type="radio"
        name="no"
        value="No"
        id="l-add-review-no"
        checked={recommend === 'No'}
        onChange={onOptionChange}
      />
      No
    </label>
  </div>
);

export default Recommend;
