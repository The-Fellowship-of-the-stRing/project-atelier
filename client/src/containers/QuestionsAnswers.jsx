import React, { useEffect, useState } from 'react';
import '../stylesheets/questions_answers/questionsAnswers.css';
import Search from '../components/questions_answers/Search.jsx';
import QuestionsList from '../components/questions_answers/QuestionsList.jsx';
import AddAnswer from '../components/questions_answers/AddAnswer.jsx';
import AddQuestion from '../components/questions_answers/AddQuestion.jsx';
import axios from 'axios';

const QuestionsAnswers = ( { itemId, itemName } ) => {

  const [questionData, setQuestionData] = useState([]);
  const [resultsToShow, setResultsToShow] = useState([]);
  const [currentCount, setCurrentCount] = useState(4);
  const [numOfQuestionsToGet, setNumOfAnswersToGet] = useState(400);
  const [questionBody, setQuesitonBody] = useState({});
  const [addAnswerModal, setAddAnswerModal] = useState(false);
  const [addQuestionModal, setAddQuestionModal] = useState(false);
  const [questionId, setQuestionId] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleQuestionModal = (value) => {
    setAddQuestionModal(value);
  }

  const handleAnswerModal = (value, body={}, questionId) => {
    setQuestionId(questionId);
    setQuesitonBody(body);
    setAddAnswerModal(value);
  }

  const handleHelpful = (questionId) => {
    axios.put(`/qa/questions/${questionId}/helpful`)
    .then(() => {
      fetchQuestionData()
    })
    .catch((err) => console.error(err))
  }


  const fetchQuestionData = async () => {
    try {
      const response = await axios.get(`/qa/questions/?product_id=${itemId}&count=${numOfQuestionsToGet}`)
      const notReported = response.data.results.filter((value) => value.reported === false)
      const sortedResults = notReported.sort((a, b) => b.question_helpfulness - a.question_helpfulness)
      if (searchTerm.length >= 3) {
        const filteredBySearchText = sortedResults.filter((question) => {
          return question.question_body.toLowerCase().includes(searchTerm.toLowerCase())
        });
        setResultsToShow(filteredBySearchText)
      } else {
        setQuestionData(sortedResults)
      }
      return response.data
    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    fetchQuestionData()
  }, [itemId, searchTerm])

  useEffect(() => {
    setResultsToShow(questionData.slice(0, currentCount))
  }, [questionData, currentCount])


  const handleMoreAnsweredQuestions = () => {
    setCurrentCount(currentCount+2)
  }


  return resultsToShow ? (

    <div className="k-questions-answers-main-container">
      <div className="k-q-a-title">Questions and Answers</div>
      {addAnswerModal && (
                  <div>
                    <AddAnswer
                    fetchQuestionData={fetchQuestionData}
                    questionBody={questionBody}
                    itemId={itemId}
                    handleAnswerModal={handleAnswerModal}
                    itemName={itemName}
                    questionId={questionId}
                    />
                  </div>
                )}
                {addQuestionModal && (
                  <div>
                    <AddQuestion
                    itemId={itemId}
                    itemName={itemName}
                    handleQuestionModal={handleQuestionModal}
                    fetchQuestionData={fetchQuestionData}
                    />
                  </div>
                )}
      <Search
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      />
      <QuestionsList
      searchTerm={searchTerm}
      handleHelpful={handleHelpful}
      resultsToShow={resultsToShow}
      currentCount={currentCount}
      itemId={itemId}
      handleAnswerModal={handleAnswerModal}
      />
      {(resultsToShow.length >= 2) && (resultsToShow.length <= 20) && (
        <button
        className="k-more-answered-questions"
        onClick={() => handleMoreAnsweredQuestions()}
        >
          More Answered Questions
        </button>
      )}
      <button className="k-add-a-question"
      onClick={() => handleQuestionModal(true)}
      >Add a Question +
      </button>

    </div>
  ) : (
    // <div>Loading...</div>
    <button className="k-add-a-question"
      onClick={() => handleQuestionModal(true)}
      >Add a Question +
      </button>
  )
}

export default QuestionsAnswers