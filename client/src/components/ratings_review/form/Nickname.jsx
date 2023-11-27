import React from 'react';

const Nickname = ({ nickname, handleNickname }) => (
  <>
    <label htmlFor="add-review-nickname" className="l-add-review-section-title">
      What is your nickname?
      <input
        type="text"
        id="add-review-nickname"
        alt="nickname field"
        value={nickname}
        placeholder="Example: jackson11!"
        onChange={(e) => handleNickname(e)}
        className="l-add-review-summary"
      />
    </label>
    <div className="l-add-review-input-footer">For privacy reasons, do not use your full name or email address</div>
  </>
);

export default Nickname;
