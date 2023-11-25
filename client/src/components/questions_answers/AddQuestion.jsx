import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineClose } from "react-icons/ai";
import '../../stylesheets/questions_answers/AddQuestionModal.css'

const AddQuestion = ( { itemId, itemName, handleQuestionModal, fetchQuestionData } ) => {

  const [yourQuestion, setYourQuestion] = useState('');
  const [yourNickName, setYourNickName] = useState('');
  const [yourEmail, setYourEmail] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const checkValidity = () => {
    if ((yourQuestion.length > 1000 || yourQuestion.length === 0) ||
        (yourNickName.length > 60 || yourNickName.length === 0) ||
        (yourEmail.length > 60 || yourEmail.length === 0) ||
        !yourEmail.includes('@')) {
      setIsInvalid(true)
      setYourQuestion('');
      setYourNickName('');
      setYourEmail('');
    } else {
      setIsInvalid(false);
    }
  }

  const sendQuestionData = (e) => {
    e.preventDefault();
    checkValidity();
    if (!isInvalid) {
      axios.post(`/qa/questions`, {
        product_id: itemId,
        body: yourQuestion,
        name: yourNickName,
        email: yourEmail,
      })
      .then((response) => {
        fetchQuestionData()
      })
      .then(() => {
        alert('thank you for submitting!')
        handleQuestionModal(false)
      })
      .catch((err) => console.error(err))
    }
  }


  return (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h1>Ask your question about:</h1>
            <h2>{itemName}</h2>
            <div>
              <label className="k-question-container">
                *Your Question:
                <input
                placeholder="Your question here..."
                className="k-your-question"
                value={yourQuestion}
                onChange={e => setYourQuestion(e.target.value)}
                >
                </input>
              </label>
                <label className="k-nickname-container">
                  *What is Your Nickname:
                  <input
                  className="k-your-nickname"
                  placeholder="Example: jackson11!"
                  value={yourNickName}
                  onChange={e => setYourNickName(e.target.value)}
                  >
                  </input>
                  <span className="k-nickname-privacy">For privacy reasons, do not use your full name.</span>
                </label>
              <label className="k-email-container">
                *Your Email:
                <input
                placeholder="Example: jack@email.com"
                className="k-your-email"
                value={yourEmail}
                onChange={e => setYourEmail(e.target.value)}
                >
                </input>
                <span className="k-email-privacy">For authentication reasons, you will not be emailed.</span>
              </label>
              <button
              type="button"
              className="k-add-queston-submit"
              onClick={e => sendQuestionData(e)}
              // onClick={e => sendQuestionData(e)}
              >
                Submit Your Question
              </button>
              {isInvalid &&
                <div>***You made an invalid entry***</div>
              }
            </div>
            <AiOutlineClose className="k-add-question-close" onClick={() => handleQuestionModal(false)}/>
          <span className="k-denotes-mandatory">* denotes mandatory field</span>
          </div>
        </div>

  )
}

export default AddQuestion