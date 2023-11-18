import React, { useEffect, useState } from 'react';
import Answers from './Answers.jsx';
import '../../stylesheets/questions_answers/questionsAnswers.css'

const QuestionsList = ( {resultsToShow, currentCount} ) => {


  return resultsToShow ? (
    <div className="k-questions-list">
      QuestionsList Component
      {resultsToShow.map((question, i) => {
        return (
          <div>
            <span>Q: {question.question_body}</span>
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

//format date
// const formattedDate = date.toLocaleDateString("en-US", {
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric'
// });

//hide/show button
{/* <button type="button" className="l-review-list-more-btn" onClick={() => handleViewMore()} hidden={resultsToShow.length >= results.length ? true : false}>MORE REVIEWS</button> */}