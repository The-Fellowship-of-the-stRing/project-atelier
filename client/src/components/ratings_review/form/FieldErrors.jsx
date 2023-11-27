import React from 'react';

const FieldErrors = ({
  overall, selectOption, formBody, nickname, validEmail,
}) => (
  <div className="l-add-review-errors">
    You must enter the following:
    <ul>
      {overall === 0 && (
      <li data-testid="error-message">Select an overall rating</li>
      )}
      {selectOption && (
      // eslint-disable-next-line react/no-unescaped-entities
      <li data-testid="error-message">Please rate the product's characteristics</li>
      )}
      {formBody.length <= 50 && (
      <li data-testid="error-message">Review body must be longer than 50 characters</li>
      )}
      {nickname.length < 1 && (
      <li data-testid="error-message">Please add your nickname. Example: jackson11!</li>
      )}
      {!validEmail && (
      <li data-testid="error-message">Please use valid email. Example: jackson11@email.com</li>
      )}
    </ul>
  </div>
);

export default FieldErrors;
