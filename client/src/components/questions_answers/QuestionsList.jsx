import React, { useEffect, useState } from 'react';
import Answers from './Answers.jsx';
import '../../stylesheets/questions_answers/questionsAnswers.css'
import '../../stylesheets/questions_answers/questionsList.css'

const QuestionsList = ( { resultsToShow, currentCount, handleHelpful } ) => {

  const [marked, setMarked] = useState({});


  const checkMarked = (id) => {
    if (!marked[id]) {
      setMarked({...marked, id: true});
      handleHelpful(id)
    }
  }

  return resultsToShow ? (
    <div className="k-questions-list">
      {resultsToShow.map((question, i) => {
        const id = question.question_id;
        return (
          <div className="k-question-answer-container" key={id}>

            <div className="k-question-block">
              <div className="k-question-body">
                Q: {question.question_body}
              </div>
              <div className="k-question-helpful">
                Helpful? <span onClick={() => checkMarked(id)} className="k-question-yes-click" style={{cursor: marked.id ? "default" : "pointer"}}>Yes</span>({question.question_helpfulness})  |  <span className="k-add-answer">Add answer</span>
              </div>
            </div>
              <Answers questionId={id}/>
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
