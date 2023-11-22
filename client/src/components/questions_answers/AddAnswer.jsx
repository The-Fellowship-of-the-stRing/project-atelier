import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../stylesheets/questions_answers/AddAnswerModal.css'

const AddAnswer = ({ questionBody, itemId, handleAnswerModal, itemName, questionId } ) => {

  const [product, setProduct] = useState({});
  const [yourAnswer, setYourAnswer] = useState('');
  const [yourNickName, setYourNickname] = useState('');
  const [yourEmail, setYourEmail] = useState('');
  const [yourPhotos, setYourPhotos] = useState([]);

  // const sendAnswerData = () => {
  //   axios.put(`/qa/questions/:question_id/answers`)
  // }

  console.log('questionId in AddAnswer: ', questionId)


  return (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h1>Submit Your Answer</h1>
            <h2>{itemName} : {questionBody}</h2>
            <form >
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
              className="k-add-answer-submit"
              onClick={() => handleAnswerModal(false)}

              >
                Submit
              </button>
            </form>
            <button className="close-modal" onClick={() => handleAnswerModal(false)}>
              CLOSE
            </button>
          </div>
        </div>

  )
}

export default AddAnswer