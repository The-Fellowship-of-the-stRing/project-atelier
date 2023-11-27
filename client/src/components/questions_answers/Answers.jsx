import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../stylesheets/questions_answers/answers.css';

const Answers = ({ questionId, answersToShow }) => {
  const [marked, setMarked] = useState({});
  const [reported, setReported] = useState({});
  const [initialAnswers, setInitialAnswers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/qa/questions/${questionId}/answers?question_id=${questionId}`);
      const sortedResults = response.data.results.sort((a, b) => b.helpfulness - a.helpfulness);
      const sellerToTop = sortedResults.sort((a, b) => (b.answerer_name === 'Seller') - (a.answerer_name === 'Seller'));
      setInitialAnswers(sellerToTop.slice(0, answersToShow));
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
              </div>
              <div
                className="k-answer-yes-click"
                onKeyDown={() => checkMarked(id)}
                tabIndex="0"
                role="button"
                style={{ cursor: marked[id] ? 'default' : 'pointer' }}
                onClick={() => checkMarked(id)}
              >
                Yes
                {' '}
              </div>
              (
              {answer.helpfulness}
              ) |
              <div className="k-answer-report">
                <div
                  className="k-answer-report-click"
                  onKeyDown={() => checkReported(id)}
                  tabIndex="0"
                  role="button"
                  onClick={() => checkReported(id)}
                  style={{ cursor: reported[id] ? 'default' : 'pointer' }}
                >
                  {reported[id] ? 'Reported' : 'Report'}
                </div>
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
