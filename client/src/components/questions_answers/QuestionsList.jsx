import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import Answers from './Answers.jsx';
import AddAnswer from './AddAnswer.jsx';
import '../../stylesheets/questions_answers/questionsAnswers.css'
import '../../stylesheets/questions_answers/questionsList.css'

const QuestionsList = ( { resultsToShow, currentCount, handleHelpful, itemId } ) => {

  const [marked, setMarked] = useState({});
  const [answerData, setAnswerData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const checkMarked = (id) => {
    if (!marked[id]) {
      setMarked({...marked, [id]: true});
      handleHelpful(id)
    }
  }

  const handleAddAnswer = () => {
    setShowModal(true);
  }


  return resultsToShow ? (
    <div className="k-questions-list">
      {resultsToShow.map((question, index) => {
        const id = question.question_id;
        return (
          <div className="k-question-answer-container" key={id}>

            <div className="k-question-block">
              <div className="k-question-body">
                Q: {question.question_body}
              </div>
              <div className="k-question-helpful">
                Helpful? <span onClick={() => checkMarked(id)} className="k-question-yes-click" style={{cursor: marked[id] ? "default" : "pointer"}}>Yes</span>({question.question_helpfulness})  |  <span className="k-add-answer" onClick={() => handleAddAnswer()}>Add answer</span>
                {showModal && (
                  <div>
                    <AddAnswer
                    questionBody={question.question_body}
                    itemId={itemId}
                    />
                  </div>
                )}
              </div>
            </div>
              <Answers
              questionId={id}
              answerData={answerData}
              setAnswerData={setAnswerData}
              itemId={itemId}
              />
              <span className="k-load-more-answers"
              ><strong>LOAD MORE ANSWERS/ SEE MORE ANSWERS</strong>
              </span>
          </div>
        )
      })}
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default QuestionsList
