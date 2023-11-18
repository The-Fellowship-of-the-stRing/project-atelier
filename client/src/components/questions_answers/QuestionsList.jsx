import React, { useEffect, useState } from 'react';
import Answers from './Answers.jsx';
import '../../stylesheets/questions_answers/questionsAnswers.css'

const QuestionsList = ( {resultsToShow, currentCount} ) => {


  return resultsToShow ? (
    <div className="k-questions-list">
      {resultsToShow.map((question, i) => {
        return (
          <div className="k-question-answer-container" key={i}>

            <div className="question-block">
              <div className="k-question-body">
                Q: {question.question_body}
              </div>
              <div className="k-question-helpful">
                Helpful? <a href="#" className="k-question-yes-click">Yes</a> ({question.question_helpfulness})
              </div>
              <div>
                add answer-link to form
              </div>
            </div>
              <Answers questionId={question.question_id}/>
          </div>
        )
      })}
      <button>Load more answers</button>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default QuestionsList
