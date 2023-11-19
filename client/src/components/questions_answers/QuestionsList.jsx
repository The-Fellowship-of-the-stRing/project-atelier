import React, { useEffect, useState } from 'react';
import Answers from './Answers.jsx';
import '../../stylesheets/questions_answers/questionsAnswers.css'
import '../../stylesheets/questions_answers/questionsList.css'

const QuestionsList = ( {resultsToShow, currentCount} ) => {


  return resultsToShow ? (
    <div className="k-questions-list">
      {resultsToShow.map((question, i) => {
        return (
          <div className="k-question-answer-container" key={i}>

            <div className="k-question-block">
              <div className="k-question-body">
                Q: {question.question_body}
              </div>
              <div className="k-question-helpful">
                Helpful? <span className="k-question-yes-click">Yes</span>({question.question_helpfulness})  |  <span className="k-add-answer">add answer</span>
              </div>
            </div>
              <Answers questionId={question.question_id}/>
          </div>
        )
      })}
      <span className="k-load-more-answers"><strong>LOAD MORE ANSWERS</strong></span>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default QuestionsList
