import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddAnswer from './AddAnswer.jsx';
import '../../stylesheets/questions_answers/answers.css'

const Answers = ( { questionId, answerData, setAnswerData } ) => {

  const [marked, setMarked] = useState({});
  const [reported, setReported] = useState({});


  const checkMarked = (id) => {
    if (!marked[id]) {
      setMarked({...marked, [id]: true})
      handleHelpful(id)
    }
  }

  const checkReported = (id) => {
    if (!reported[id]) {
      setReported({...reported, [id]: true})
      handleReported(id)
    }
  }

  const handleReported = (answerId) => {
    axios.put(`/qa/answers/${answerId}/report`)
    .then((result) => {
      fetchData()
    })
    .catch((err) => console.error(err))
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`/qa/questions/${questionId}/answers?question_id=${questionId}`);
      const sortedResults = response.data.results.sort((a, b) => b.helpfulness - a.helpfulness)
      setAnswerData(sortedResults)
      return response.data
    } catch (err) {
      console.error(err)
    }
  };

  const handleHelpful = (answerId) => {

    axios.put(`/qa/answers/${answerId}/helpful`)
    .then((result) => {
      fetchData()
    })
    .catch((err) => console.error(err))
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
    fetchData()
  }, [questionId])


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
            Helpful? <span className="k-answer-yes-click" style={{cursor: marked[id] ? "default" : "pointer"}} onClick={() => checkMarked(id)}>Yes</span> ({answer.helpfulness}) |
            </div>
            <div className="k-answer-report">
            <span className="k-answer-report-click" onClick={() => checkReported(id)} style={{cursor: reported[id] ? "default" : "pointer"}} >{reported[id] ? "Reported" : "Report"}</span>
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
