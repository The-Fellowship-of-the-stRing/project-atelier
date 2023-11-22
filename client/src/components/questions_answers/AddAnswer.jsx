import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../stylesheets/questions_answers/AddAnswerModal.css'

const AddAnswer = (questionBody, itemId ) => {

  const [product, setProduct] = useState({})
  const [modal, setModal] = useState(false);
  const [yourAnswer, setYourAnswer] = useState('');
  const [yourNickName, setYourNickname] = useState('');
  const [yourEmail, setYourEmail] = useState('');
  const [yourPhotos, setYourPhotos] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };


  useEffect(() => {
    axios.get(`products/?product_id=${itemId}`)
    .then((response) => {
      console.log('response.data: ', response.data)
      setProduct(response.data)
    })
    .catch((err) => console.log('error in AddAnswer:', err))
  }, [itemId])


  console.log(yourAnswer)
  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Open
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h1>{}</h1>
            <h2>{questionBody.questionBody}</h2>
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
              onClick={() => handleSubmit()}
              >
              </button>
            </form>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AddAnswer