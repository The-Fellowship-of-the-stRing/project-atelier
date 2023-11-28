import React from 'react';
import { render, fireEvent, screen, toBeInTheDocument } from '@testing-library/react';
import ProductDetails from '../client/src/containers/ProductDetails.jsx'

describe('Checks if data is being displayed on the product details', () => {
  it('Loading is displayed properly in product_details', async () => {
    render(<ProductDetails/>);
    const text = await screen.findByText('Loading...')
    expect(text).toBeTruthy();
  });
});