import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../stylesheets/questions_answers/AddQuestionModal.css'

const AddQuestion = ( { itemId, itemName, handleQuestionModal, fetchQuestionData } ) => {

  const [yourQuestion, setYourQuestion] = useState('');
  const [yourNickName, setYourNickname] = useState('');
  const [yourEmail, setYourEmail] = useState('');

  const sendQuestionData = (e) => {
    e.preventDefault();
    axios.post(`/qa/questions`, {
      product_id: itemId,
      body: yourQuestion,
      name: yourNickName,
      email: yourEmail,
    })
    .then((response) => {
      fetchQuestionData()
    })
    .catch((err) => console.error(err))
  }


  return (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h1>Ask Your Question</h1>
            <h2>About the {itemName}</h2>
            <div>
              <label>
                Your Question:
                <input
                className="k-your-question"
                value={yourQuestion}
                onChange={e => setYourQuestion(e.target.value)}
                >
                </input>
              </label>
              <label>
                What is Your Nickname:
                <input
                className="k-your-nickname"
                value={yourNickName}
                onChange={e => setYourNickname(e.target.value)}
                >
                </input>
              </label>
              <label>
                Your Email:
                <input
                className="k-your-email"
                value={yourEmail}
                onChange={e => setYourEmail(e.target.value)}
                >
                </input>
              </label>
              <button
              type="button"
              className="k-add-queston-submit"
              // onClick={() => handleQuestionModal(false)}
              onClick={e => sendQuestionData(e)}

              >
                Submit Your Question
              </button>
            </div>

            <button
            className="close-modal"
            onClick={() => handleQuestionModal(false)}
            >
              CLOSE
            </button>
          </div>
        </div>

  )
}

export default AddQuestion