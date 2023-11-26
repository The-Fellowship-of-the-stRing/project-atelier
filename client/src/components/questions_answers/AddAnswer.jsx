import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineClose } from "react-icons/ai";
import '../../stylesheets/questions_answers/AddAnswerModal.css'

const AddAnswer = ({ questionBody, itemId, handleAnswerModal, itemName, questionId, fetchQuestionData } ) => {

  const [yourAnswer, setYourAnswer] = useState('');
  const [yourNickName, setYourNickName] = useState('');
  const [yourEmail, setYourEmail] = useState('');
  const [yourPhotos, setYourPhotos] = useState([]);
  const [isInvalid, setIsInvalid] = useState(false);


  const checkValidity = () => {
    if ((yourAnswer.length > 1000 || yourAnswer.length === 0) ||
        (yourNickName.length > 60 || yourNickName.length === 0) ||
        (yourEmail.length > 60 || yourEmail.length === 0) ||
        !yourEmail.includes('@')) {
      setIsInvalid(true);
      setYourAnswer('');
      setYourNickName('');
      setYourEmail('');
    } else {
      setIsInvalid(false);
    }
  }

  const sendAnswerData = (e) => {
    e.preventDefault();
    checkValidity();
    if (isInvalid === false) {
      axios.post(`/qa/questions/${questionId}/answers`, {
        body: yourAnswer,
        name: yourNickName,
        email: yourEmail,
        photos: yourPhotos
      })
      .then((response) => {
        fetchQuestionData()
      })
      .then(() => handleAnswerModal(false))
      .catch((err) => console.error(err))
    }
    setTimeout(() => setIsInvalid(false), "5000");
  }


  return (
        <div className="k-add-answer-overlay">
          <div className="k-add-answer-modal">
            <h1 className="k-answer-header">Submit Your Answer</h1>
            <h2 className="k-answer-sub-header">{itemName} : {questionBody}</h2>
            <div>
              <label className="k-answer-container">
                <div className="k-answer-title">*Your Answer:</div>
                <input
                placeholder="Your answer here..."
                className="k-your-answer"
                value={yourAnswer}
                onChange={e => setYourAnswer(e.target.value)}
                >
                </input>
              </label>
              <label className="k-answer-nickname-container">
                <div className="k-answer-nickname-title">*Your Nickname:</div>
                <input
                className="k-your-nickname"
                placeholder="Example: jack543!"
                value={yourNickName}
                onChange={e => setYourNickName(e.target.value)}
                >
                </input>
                <span className="k-nickname-privacy">For privacy reasons, do not use your full name.</span>
              </label>
              <label className="k-answer-email-container">
                <div className="k-answer-email-title">*Your Email:</div>
                <input
                placeholder="Example: jack@email.com"
                className="k-your-email"
                value={yourEmail}
                onChange={e => setYourEmail(e.target.value)}
                >
                </input>
                <span className="k-answer-email-privacy">For authentication reasons, you will not be emailed.</span>
              </label>
              <button
              type="button"
              className="k-add-answer-submit"
              onClick={e => sendAnswerData(e)}
              >
                Submit
              </button>
              {isInvalid &&
                <ul className="k-answer-error-message">
                  <li>Fields must not be blank</li>
                  <li>Email must be in correct format: name@email.com</li>
                </ul>
              }
            </div>
            <AiOutlineClose className="k-add-answer-close" onClick={() => handleAnswerModal(false)}/>
            <span className="k-denotes-mandatory">* denotes mandatory field</span>
          </div>
        </div>

  )
}

export default AddAnswer