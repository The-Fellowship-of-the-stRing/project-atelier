import React, { useEffect, useState } from 'react';
import '../stylesheets/questions_answers/questionsAnswers.css';
import Search from '../components/questions_answers/Search.jsx';
import QuestionsList from '../components/questions_answers/QuestionsList.jsx';
import axios from 'axios';

const QuestionsAnswers = ( {itemId} ) => {
  //holds state for all questions/answer data. use useEffect for API call to get all question/answer data to hand down to Search and QuestionsList
  const [questionData, setQuestionData] = useState([]);
  const [resultsToShow, setResultsToShow] = useState([])
  const [currentCount, setCurrentCount] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          headers: {
            "Authorization" : process.env.GIT_TOKEN
          }
        };
        const url = process.env.GIT_API_URL;
        const response = await axios.get(`${url}/qa/questions/?product_id=${itemId}`, headers)
        const notReported = response.data.results.filter((value) => value.reported === false)
        const sortedResults = notReported.sort((a, b) => b.question_helpfulness - a.question_helpfulness)
        setQuestionData(sortedResults)
        return response.data
      } catch (err) {
        console.error(err)
      }
    };

    fetchData()
  }, [itemId])

  useEffect(() => {
    setResultsToShow(questionData.slice(0, currentCount))
  }, [questionData])


  const handleClick = () => {
    setCurrentCount(currentCount+2)
  }

  return resultsToShow.length > 0 ? (
    <div className="k-questions-answers-main-container">
      <Search />
      <QuestionsList resultsToShow={resultsToShow} currentCount={currentCount}/>
      <button className="k-more-answered-questions" onClick={() => handleClick()}>
        More Answered Questions
      </button>
      <button className="k-add-a-question">Add a Question +</button>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default QuestionsAnswers