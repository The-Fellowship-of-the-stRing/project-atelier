import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import QuestionsAnswers from '../client/src/containers/QuestionsAnswers.jsx';


describe('checks for Helpful text on questions feature', () => {
  it('should be true if text Helpful? is on the screen', () => {
    render(<QuestionsAnswers />);
    expect(screen.findByText('Helpful?')).toBeTruthy();
  });
});