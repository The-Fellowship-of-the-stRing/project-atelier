import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../client/src/App.jsx'

describe('renders all pieces to frontend', () => {
 it('should render the counter button', () => {
   render(<App />);
   expect(screen.getByText('Welcome to React App thats build using Webpack and Babel separately! Great Job team!',)).toBeTruthy();
 })
})
