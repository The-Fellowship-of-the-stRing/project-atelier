import React, { useEffect, useState } from 'react';
import '../stylesheets/questions_answers/questionsAnswers.css';
import Search from '../components/questions_answers/Search.jsx';
import QuestionsList from '../components/questions_answers/QuestionsList.jsx';
import axios from 'axios';

const QuestionsAnswers = ( {itemId} ) => {

  const [questionData, setQuestionData] = useState([]);
  const [resultsToShow, setResultsToShow] = useState([]);
  const [currentCount, setCurrentCount] = useState(2);
  const [numOfQuestionsToGet, setNumOfAnswersToGet] = useState(400);

  const handleHelpful = (questionId) => {
    axios.put(`/qa/questions/${questionId}/helpful`)
    .then(() => {
      axios.get(`/qa/questions/?product_id=${itemId}`)
      .then((result) => {
        console.log('inside handleHelpul: ', result.data.results)
        setResultsToShow(result.data.results)
      })
      .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
  }

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axios.get(`/qa/questions/?product_id=${itemId}&count=${numOfQuestionsToGet}`)
        const notReported = response.data.results.filter((value) => value.reported === false)
        const sortedResults = notReported.sort((a, b) => b.question_helpfulness - a.question_helpfulness)
        setQuestionData(sortedResults)
        return response.data
      } catch (err) {
        console.error(err)
      }
    };

    fetchQuestionData()
  }, [itemId])

  useEffect(() => {
    setResultsToShow(questionData.slice(0, currentCount))
  }, [questionData, currentCount])


  const handleMoreAnsweredQuestions = () => {
    setCurrentCount(currentCount+2)
  }

  return resultsToShow.length > 0 ? (
    <div className="k-questions-answers-main-container">
      <Search />
      <QuestionsList handleHelpful={handleHelpful} resultsToShow={resultsToShow} currentCount={currentCount}/>
      {(resultsToShow.length >= 2) && (resultsToShow.length <= 20) && (
        <button
        className="k-more-answered-questions"
        onClick={() => handleMoreAnsweredQuestions()}
        >
          More Answered Questions
        </button>
      )}
      <button className="k-add-a-question">Add a Question +</button>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default QuestionsAnswers