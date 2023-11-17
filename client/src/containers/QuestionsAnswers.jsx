import React from 'react';
import '../stylesheets/questions_answers/questionsAnswers.css';
import Search from '../components/questions_answers/Search.jsx';
import QuestionsList from '../components/questions_answers/QuestionsList.jsx';

const QuestionsAnswers = ( {item} ) => {

  return (
    <div className="k-questions-answers-main-container">
      <Search/>
    </div>
  )
}

export default QuestionsAnswers