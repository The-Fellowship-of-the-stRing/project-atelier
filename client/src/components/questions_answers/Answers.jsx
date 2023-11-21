import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../stylesheets/questions_answers/answers.css'

const Answers = ( { questionId } ) => {

  const [answerData, setAnswerData] = useState([]);
  const [answerMarked, setAnswerMarked] = useState({});
  const [reported, setReported] = useState({});

  const checkAnswerReported = (id) => {
    if (!reported[id]) {
      setReported({...reported, [id]: true})
      handleReported(id)
    }
  }

  const handleReported = (answerId) => {
    axios.put(`/qa/answers/${answerId}/report`)
    .then((result) => {
      fetchAnswerData()
    })
    .catch((err) => console.log(err))
  }

  const checkAnswerMarked = (id) => {
    console.log('id to mark:: ', id)
    if (!answerMarked[id]) {
      setAnswerMarked({...answerMarked, [id]: true})
      handleAnswerHelpful(id)
    }
  }

  const fetchAnswerData = async () => {
    try {
      const response = await axios.get(`/qa/questions/${questionId}/answers?question_id=${questionId}`);
      const sortedResults = response.data.results.sort((a, b) => b.helpfulness - a.helpfulness)
      setAnswerData(sortedResults)
      return response.data
    } catch (err) {
      console.error(err)
    }
  };

  const handleAnswerHelpful = (answerId) => {
    axios.put(`/qa/answers/${answerId}/helpful`)
    .then((result) => {
      fetchAnswerData()
    })
    .catch((err) => console.log(err))
  }

  const formatDate = (dateToFormat) => {
    const date = new Date(dateToFormat)

    const formattedDate = date.toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return formattedDate;
  }

  useEffect(() => {
    fetchAnswerData()
  }, [questionId])

  // answerData ? console.log('answerData is here!', answerData) : console.log('not here yet..., ', answerData)

  return answerData ? (
    <>
    {answerData.map((answer, i) => {
      const id = answer.answer_id;
      return (
        <div className="k-answer-main-block" key={i}>

          <div className="k-answer-body">
            A: {answer.body}
          </div>

          <div className="k-answer-details-block">
            <div className="k-answer-user">
              {answer.answerer_name === 'seller' ?
              <strong>{answer.answerer_name},</strong>
              : answer.answerer_name},
            </div>

            <div className="k-answer-date">{formatDate(answer.date)} | </div>

            <div className="k-answer-helpful">
              Helpful? <span className="k-answer-yes-click" style={{cursor: answerMarked[id] ? "default" : "pointer"}} onClick={() => checkAnswerMarked(id)}>Yes</span> |  ({answer.helpfulness})
            </div>
            <div className="k-answer-report">
              <span className="k-answer-report-click" onClick={() => checkAnswerReported(id)} style={{cursor: reported[id] ? "default" : "pointer"}} >{reported[id] ? "Reported" : "Report"}</span>
            </div>
          </div>

        </div>
      )
    })}
    </>

  ) : (
    <div>
      Loading...
    </div>
  )
}

export default Answers
