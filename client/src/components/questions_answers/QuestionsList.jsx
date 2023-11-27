import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import Answers from './Answers.jsx';
// import AddAnswer from './AddAnswer.jsx';
import '../../stylesheets/questions_answers/questionsAnswers.css';
import '../../stylesheets/questions_answers/questionsList.css';

const QuestionsList = ({
  resultsToShow, handleHelpful, itemId, handleAnswerModal,
}) => {
  const [marked, setMarked] = useState({});
  // const [showModal, setShowModal] = useState(false);
  const [answersToShow, setAnswersToShow] = useState(2);

  const handleAnswersToShow = (e) => {
    e.preventDefault();
    setAnswersToShow(Infinity);
  };

  const handleCollapseAnswers = (e) => {
    e.preventDefault();
    setAnswersToShow(2);
  };

  const checkMarked = (id) => {
    if (!marked[id]) {
      setMarked({ ...marked, [id]: true });
      handleHelpful(id);
    }
  };

  return resultsToShow ? (
    <div className="k-questions-list">
      {resultsToShow.map((question) => {
        const id = question.question_id;
        return (
          <div className="k-question-answer-container" key={id}>

            <div className="k-question-block">
              <div className="k-question-body">
                Q:
                {' '}
                {question.question_body}
              </div>
              <div className="k-question-helpful">
                Helpful?
                {' '}
                <div
                  onKeyDown={() => checkMarked(id)}
                  tabIndex="0"
                  role="button"
                  onClick={() => checkMarked(id)}
                  className="k-question-yes-click"
                  style={{ cursor: marked[id] ? 'default' : 'pointer' }}
                >
                  Yes
                </div>
                (
                {question.question_helpfulness}
                )  |
                {' '}
                <div
                  onKeyDown={() => handleAnswerModal(true, id, question.question_body)}
                  tabIndex="0"
                  role="button"
                  className="k-add-answer"
                  onClick={() => handleAnswerModal(true, id, question.question_body)}
                >
                  Add answer
                </div>
              </div>
            </div>
            <Answers
              answersToShow={answersToShow}
              questionId={id}
              itemId={itemId}
            />
            {answersToShow <= 2
              ? (
                <div
                  onKeyDown={(e) => handleAnswersToShow(e)}
                  tabIndex="0"
                  role="button"
                  className="k-load-more-answers"
                  onClick={(e) => handleAnswersToShow(e)}
                >
                  <strong>SEE MORE ANSWERS</strong>
                </div>
              )
              : (
                <div
                  onKeyDown={(e) => handleCollapseAnswers(e)}
                  tabIndex="0"
                  role="button"
                  className="k-collapse-answers"
                  onClick={(e) => handleCollapseAnswers(e)}
                >
                  <strong>COLLAPSE ANSWERS</strong>
                </div>
              )}
          </div>
        );
      })}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default QuestionsList;
