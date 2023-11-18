import React, { useEffect, useState } from 'react';
import '../stylesheets/questions_answers/questionsAnswers.css';
import Search from '../components/questions_answers/Search.jsx';
import QuestionsList from '../components/questions_answers/QuestionsList.jsx';
import axios from 'axios';

const QuestionsAnswers = ( {itemId} ) => {
  //holds state for all questions/answer data. use useEffect for API call to get all question/answer data to hand down to Search and QuestionsList
  const [questionData, setQuestionData] = useState('');

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
        setQuestionData(response.data.results)
        return response.data
      } catch (err) {
        console.error(err)
      }
    };

    fetchData()
  }, [itemId])

  console.log('questionData: ', questionData)

  return (
    <div className="k-questions-answers-main-container">
      <Search />
      <QuestionsList questionData={questionData}/>
      <button className="k-more-answered-questions">More Answered Questions</button>
      <button className="k-add-a-question">Add a Question</button>
    </div>
  )
}

export default QuestionsAnswers