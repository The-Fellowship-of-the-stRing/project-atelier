import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RelatedOutfits from '../client/src/containers/RelatedOutfits.jsx'

describe('checks Related Products and Outfits cards', () => {
  it('Render test on cards properly', () => {
    render(<RelatedOutfits />);
    expect(screen.findByText('Related Products')).toBeTruthy();
  });
});
