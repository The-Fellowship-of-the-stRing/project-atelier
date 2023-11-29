import React from 'react';
import axios from 'axios';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import QuestionsAnswers from '../client/src/containers/QuestionsAnswers.jsx';
import Search from '../client/src/components/questions_answers/Search.jsx';
import QuestionsList from '../client/src/components/questions_answers/QuestionsList.jsx';
import AddAnswer from '../client/src/components/questions_answers/AddAnswer.jsx';
import AddQuestion from '../client/src/components/questions_answers/AddQuestion.jsx';


//QuestionsAnswers Tests
describe('checks for Helpful text on questions feature', () => {
  it('should be true if text Helpful? is on the screen', () => {
    render(<QuestionsAnswers />);
    expect(screen.findByText('Helpful?')).toBeTruthy();
  });
});




//Add Answers Tests
const mockFormData = {
  body: "Example Answer",
  name: "BigTime200",
  email: "cheesy@hotmail.com",
  photos: []
}


const mockItemName = 'Example Name';
const mockQuestionId = 40433;
const mockQuestionBody = "Is this a question?"

describe('AddAnswer component', () => {
  it('should render Add Answer and not crash', () => {
    render(
    <AddAnswer
    questionBody="This is an example question?"
    handleAnswerModal={() => {}}
    itemName="Example Item Name"
    questionId={1}
    fetchQuestionData={() => {}}
    />
    )
  })
})

describe('AddAnswer h1 and h2 elements', () => {
  it('renders h1 element content', () => {
    render(<AddAnswer/>)
    expect(screen.findByText('Submit Your Answer'))
  })
  it('renders h2 element content', () => {
    render(<AddAnswer/>)
    expect(screen.findByText(`${mockItemName} : ${mockFormData.body}`))
  })
})

describe('AddAnswer form state change', () => {
  it('should update answer state on change', () => {
    render(<AddAnswer/>)
    const answer = screen.getByPlaceholderText('Your answer here...');
    fireEvent.change(answer, {target: {value: `${mockFormData.body}`}})
    expect(answer.value).toBe('Example Answer');
  })
  it('should update name state on change', () => {
    render(<AddAnswer/>)
    const name = screen.getByPlaceholderText('Example: jack543!');
    fireEvent.change(name, {target: {value: `${mockFormData.name}`}})
    expect(name.value).toBe('BigTime200');
  })
  it('should update email state on change', () => {
    render(<AddAnswer/>)
    const email = screen.getByPlaceholderText('Example: jack543!');
    fireEvent.change(email, {target: {value: `${mockFormData.email}`}})
    expect(email.value).toBe('cheesy@hotmail.com');
  })
})

//Submit form with no inputs (which is invalid)
// describe('AddAnswer form submit', () => {
//   it('should check for invalid message if submission data is invalid', async () => {
//     axios.post.mockRejectedValue({ message: 'Error'});
//     const { findByTestId } = render(
//     <AddAnswer
//     fetchQuestionData={() => {}}
//     questionBody={mockQuestionBody}
//     handleAnswerModal={() => {}}
//     itemName={mockItemName}
//     questionId={mockQuestionId}
//     />);

//     const submitButton = await findByTestId('submit-button')
//     expect(submitButton).toBeTruthy()

//     fireEvent.click(submitButton);


//     await waitFor(() => {
//       expect(screen.getByText('Fields must not be blank')).toBeTruthy();
//       expect(screen.getByText('Email must be in correct format: name@email.com')).toBeTruthy();
//     })
//     // expect(screen.findByText('Fields must not be blank'));
//     // expect(screen.findByText('Email must be in correct format: name@email.com'));

//     // const result1 = await screen.findByText('Fields must not be blank');
//     // const result2 = await screen.findByText('Email must be in correct format: name@email.com');
//     // expect(result1).toBeTruthy();
//     // expect(result2).toBeTruthy();
//   })
// })


describe('AddQuestion h1 and h2 elements', () => {
  it('renders h1 element content', () => {
    render(<AddQuestion/>)
    expect(screen.findByText('Ask your question about'))
  })
  it('renders h2 element content', () => {
    render(<AddQuestion/>)
    expect(screen.findByText(`${mockItemName}`))
  })
})
