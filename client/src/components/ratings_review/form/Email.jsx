import React from 'react';

const Email = ({ email, handleEmail }) => (
  <>
    <label htmlFor="add-review-email" className="l-add-review-section-title">
      Your email
      <input id="add-review-email" type="email" value={email} alt="user email" placeholder="Example: jackson11@email.com" onChange={(e) => handleEmail(e)} className="l-add-review-summary" />
    </label>

    <div className="l-add-review-input-footer">For authentication reasons, you will not be emailed</div>
  </>
);

export default Email;
