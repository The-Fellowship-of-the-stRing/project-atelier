import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import '../../stylesheets/questions_answers/AddQuestionModal.css';

const AddQuestion = ({
  itemId, itemName, handleQuestionModal, fetchQuestionData,
}) => {
  const [yourQuestion, setYourQuestion] = useState('');
  const [yourNickName, setYourNickName] = useState('');
  const [yourEmail, setYourEmail] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const checkValidity = () => {
    if ((yourQuestion.length > 1000 || yourQuestion.length === 0)
        || (yourNickName.length > 60 || yourNickName.length === 0)
        || (yourEmail.length > 60 || yourEmail.length === 0)
        || !yourEmail.includes('@')) {
      setIsInvalid(true);
      setYourQuestion('');
      setYourNickName('');
      setYourEmail('');
    } else {
      setIsInvalid(false);
    }
  };

  const sendQuestionData = (e) => {
    e.preventDefault();
    checkValidity();
    if (isInvalid === false) {
      axios.post('/qa/questions', {
        product_id: itemId,
        body: yourQuestion,
        name: yourNickName,
        email: yourEmail,
      })
        .then(() => {
          fetchQuestionData();
        })
        .then(() => handleQuestionModal(false))
        .catch((err) => console.error(err));
    }
    setTimeout(() => setIsInvalid(false), '5000');
  };

  return (
    <div className="k-add-question-overlay">
      <div className="k-add-question-modal">
        <h1 className="k-question-header">Ask your question about:</h1>
        <h2 className="k-question-sub-header">{itemName}</h2>
        <div>
          <label htmlFor="question-body" className="k-question-container">
            <div className="k-question-title">*Your Question:</div>
            <input
              placeholder="Your question here..."
              className="k-your-question"
              value={yourQuestion}
              onChange={(e) => setYourQuestion(e.target.value)}
            />
          </label>
          <label htmlFor="nickname-field" className="k-nickname-container">
            <div className="k-nickname-title">*What is Your Nickname:</div>
            <input
              className="k-your-nickname"
              placeholder="Example: jackson11!"
              value={yourNickName}
              onChange={(e) => setYourNickName(e.target.value)}
            />
            <span className="k-nickname-privacy">For privacy reasons, do not use your full name.</span>
          </label>
          <label htmlFor="email-field" className="k-email-container">
            <div className="k-email-title">*Your Email:</div>
            <input
              placeholder="Example: jack@email.com"
              className="k-your-email"
              value={yourEmail}
              onChange={(e) => setYourEmail(e.target.value)}
            />
            <span className="k-email-privacy">For authentication reasons, you will not be emailed.</span>
          </label>
          <div
            onKeyDown={(e) => sendQuestionData(e)}
            tabIndex="0"
            role="button"
            className="k-add-queston-submit"
            onClick={(e) => sendQuestionData(e)}
          >
            Submit Your Question
          </div>
          {isInvalid
                && (
                <ul className="k-question-error-message">
                  <li>Fields must not be blank</li>
                  <li>Email must be in correct format: name@email.com</li>
                </ul>
                )}
        </div>
        <AiOutlineClose className="k-add-question-close" onClick={() => handleQuestionModal(false)} />
        <span className="k-denotes-mandatory">* denotes mandatory field</span>
      </div>
    </div>

  );
};

export default AddQuestion;
