import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../stylesheets/questions_answers/questionsAnswers.css'

const Answers = ( { questionId } ) => {

  const [answerData, setAnswerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          headers: {
            "Authorization" : process.env.GIT_TOKEN
          }
        };
        const url = process.env.GIT_API_URL;
        const response = await axios.get(`${url}/qa/questions/${questionId}/answers?question_id=${questionId}`, headers);

        const sortedResults = response.data.results.sort((a, b) => b.helpfulness - a.helpfulness)
        setAnswerData(sortedResults)
        return response.data
      } catch (err) {
        console.error(err)
      }
    };

    fetchData()
  }, [questionId])

  const formatDate = (dateToFormat) => {
    const date = new Date(dateToFormat)

    const formattedDate = date.toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return formattedDate;
  }

  answerData ? console.log('answerData is here!', answerData) : console.log('not here yet..., ', answerData)

  return answerData ? (
    <>
    {answerData.map((answer, i) => {
      return (
        <div className="k-answer-main-block" key={i}>

          <div className="k-answer-body">
            A: {answer.body}
          </div>

          <div className="k-answer-details-block">
            <div className="k-answer-user">
              {answer.answerer_name === 'seller' ?
              <strong>{answer.answerer_name}</strong>
              : answer.answerer_name}
            </div>

            <div className="k-answer-date">{formatDate(answer.date)}</div>

            <div className="k-answer-helpful">
              Helpful? <a href="#" className="k-answer-yes-click">Yes</a> ({answer.helpfulness})
            </div>
            <div className="k-answer-report">
              <a href="#" className="k-answer-report-click">Report</a>
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
