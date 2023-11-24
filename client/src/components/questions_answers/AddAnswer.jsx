import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../stylesheets/questions_answers/AddAnswerModal.css'

const AddAnswer = ({ questionBody, itemId, handleAnswerModal, itemName, questionId, fetchQuestionData } ) => {

  const [product, setProduct] = useState({});
  const [yourAnswer, setYourAnswer] = useState('');
  const [yourNickName, setYourNickname] = useState('');
  const [yourEmail, setYourEmail] = useState('');
  const [yourPhotos, setYourPhotos] = useState([]);

  const sendAnswerData = (e) => {
    e.preventDefault();
    axios.post(`/qa/questions/${questionId}/answers`, {
      body: yourAnswer,
      name: yourNickName,
      email: yourEmail,
      photos: yourPhotos
    })
    .then((response) => {
      // console.log('should be fetching...', response)
      fetchQuestionData()
    })
    .catch((err) => console.error('error inside AddAnswer PUT: ', err))
  }


  return (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h1>Submit Your Answer</h1>
            <h2>{itemName} : {questionBody}</h2>
            <div>
              <label>
                Your Answer:
                <input
                className="k-your-answer"
                value={yourAnswer}
                onChange={e => setYourAnswer(e.target.value)}
                >
                </input>
              </label>
              <label>
                Your Nickname:
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
              className="k-add-answer-submit"
              // onClick={() => handleAnswerModal(false)}
              onClick={e => sendAnswerData(e)}

              >
                Submit
              </button>
            </div>

            <button
            className="close-modal"
            onClick={() => handleAnswerModal(false)}
            >
              CLOSE
            </button>
          </div>
        </div>

  )
}

export default AddAnswer