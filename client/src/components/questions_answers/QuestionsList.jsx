import React from 'react';
import '../../stylesheets/questions_answers/questionsAnswers.css'

const QuestionsList = ( {questionData} ) => {

  //maps through question/answer data
  //create component that has sturcture that shows all I want displayed
  //map data handed from parent, rending a that component
  console.log('questionData: ', typeof questionData)
  return (
    <div className="k-questions-list">
      QuestionsList Component

    </div>
  )
}

export default QuestionsList