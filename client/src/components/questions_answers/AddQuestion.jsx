import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineClose } from "react-icons/ai";
import '../../stylesheets/questions_answers/AddQuestionModal.css'

const AddQuestion = ( { itemId, itemName, handleQuestionModal, fetchQuestionData } ) => {

  const [yourQuestion, setYourQuestion] = useState('');
  const [yourNickName, setYourNickname] = useState('');
  const [yourEmail, setYourEmail] = useState('');

  const sendQuestionData = (e, closeModalFunc) => {
    e.preventDefault();
    axios.post(`/qa/questions`, {
      product_id: itemId,
      body: yourQuestion,
      name: yourNickName,
      email: yourEmail,
    })
    .then((response) => {
      fetchQuestionData()
      closeModalFunc()
    })
    .catch((err) => console.error(err))
  }


  return (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h1>Ask your question about:</h1>
            <h2>{itemName}</h2>
            <div>
              <label className="k-question-container">
                Your Question:
                <input
                placeholder="Your question here..."
                className="k-your-question"
                value={yourQuestion}
                onChange={e => setYourQuestion(e.target.value)}
                >
                </input>
              </label>

                <label className="k-nickname-container">
                  What is Your Nickname:
                  <input
                  className="k-your-nickname"
                  placeholder="Example: jackson11!"
                  value={yourNickName}
                  onChange={e => setYourNickname(e.target.value)}
                  >
                  </input>
                  <span className="k-nickname-privacy">For privacy reasons, do not use your full name.</span>
                </label>

              <label className="k-email-container">
                Your Email:
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
              onClick={e => sendQuestionData(e, handleQuestionModal(false))}

              >
                Submit Your Question
              </button>
            </div>
            <AiOutlineClose className="k-add-question-close" onClick={() => handleQuestionModal(false)}/>
          </div>
        </div>

  )
}

export default AddQuestion