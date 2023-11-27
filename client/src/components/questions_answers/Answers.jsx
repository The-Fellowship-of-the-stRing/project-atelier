import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import AddAnswer from './AddAnswer.jsx';
import '../../stylesheets/questions_answers/answers.css';

const Answers = ({ questionId, answersToShow }) => {
  const [marked, setMarked] = useState({});
  const [reported, setReported] = useState({});
  // const [answerData, setAnswerData] = useState([]);
  const [initialAnswers, setInitialAnswers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/qa/questions/${questionId}/answers?question_id=${questionId}`);
      const sortedResults = response.data.results.sort((a, b) => b.helpfulness - a.helpfulness);
      const sellerToTop = sortedResults.sort((a, b) => (b.answerer_name === 'Seller') - (a.answerer_name === 'Seller'));
      // setAnswerData(sellerToTop);
      setInitialAnswers(sellerToTop.slice(0, answersToShow));
      // return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleReported = (answerId) => {
    axios.put(`/qa/answers/${answerId}/report`)
      .then(() => {
        fetchData();
      })
      .catch((err) => console.error(err));
  };

  const handleHelpful = (answerId) => {
    axios.put(`/qa/answers/${answerId}/helpful`)
      .then(() => {
        fetchData();
      })
      .catch((err) => console.error(err));
  };

  const checkMarked = (id) => {
    if (!marked[id]) {
      setMarked({ ...marked, [id]: true });
      handleHelpful(id);
    }
  };

  const checkReported = (id) => {
    if (!reported[id]) {
      setReported({ ...reported, [id]: true });
      handleReported(id);
    }
  };

  const formatDate = (dateToFormat) => {
    const date = new Date(dateToFormat);

    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  };

  useEffect(() => {
    fetchData();
  }, [questionId, answersToShow]);

  return initialAnswers ? (
    <>
      {initialAnswers.map((answer) => {
        const id = answer.answer_id;
        return (
          <div className="k-answer-main-block" key={id}>

            <div className="k-answer-body">
              A:
              {' '}
              {answer.body}
            </div>

            <div className="k-answer-details-block">
              <div className="k-answer-user">
                by
                {' '}
                {answer.answerer_name === 'Seller'
                  ? <strong>{answer.answerer_name}</strong>
                  : answer.answerer_name}
                ,
              </div>

              <div className="k-answer-date">
                {formatDate(answer.date)}
                {' '}
                |
                {' '}
              </div>

              <div className="k-answer-helpful">
                Helpful?
                {' '}
                <button
                  type="button"
                  className="k-answer-yes-click"
                  style={{ cursor: marked[id] ? 'default' : 'pointer' }}
                  onClick={() => checkMarked(id)}
                >
                  Yes

                </button>
                {' '}
                (
                {answer.helpfulness}
                ) |
              </div>
              <div className="k-answer-report">
                <button
                  type="button"
                  className="k-answer-report-click"
                  onClick={() => checkReported(id)}
                  style={{ cursor: reported[id] ? 'default' : 'pointer' }}
                >
                  {reported[id] ? 'Reported' : 'Report'}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>

  ) : (
    <div>
      Loading...
    </div>
  );
};

export default Answers;
