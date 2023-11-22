import React from 'react';
import { render, fireEvent, screen, toBeInTheDocument } from '@testing-library/react';
import ProductDetails from '../client/src/containers/ProductDetails.jsx'

describe('Checks if data is being displayed on the product details', () => {
  it('Values are displayed properly', () => {
    render(<ProductDetails/>);
    expect(screen.findByText('Style')).toBeTruthy();
  });
});
