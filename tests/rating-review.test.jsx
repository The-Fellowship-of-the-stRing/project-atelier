import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import SortDropDown from '../client/src/components/ratings_review/SortDropDown'
import ReviewList from '../client/src/components/ratings_review/ReviewList'
import RatingsReviews from '../client/src/containers/RatingsReviews.jsx'
import RatingBreakdown from '../client/src/components/ratings_review/RatingBreakdown.jsx'
import StarBar from '../client/src/components/ratings_review/StarBar.jsx'

import data from './test.data.js'

const mockTotals = {
  recommended: { true: 100, false: 50 },
  ratings: { '5': 50, '4': 30, '3': 15, '2': 5, '1': 0 }
};

jest.mock('../client/src/utils/getItemDetails', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve(4.2)), // Mock return value for average rating
}));

describe('checks Ratings and Review elements', () => {

 it('should render the select tag with a default value set in SortDropDown', () => {
   render(<SortDropDown sort='relevant'/>);
   expect(screen.getByRole('combobox', {value: 'relevant'})).toBeTruthy();
 })

 it('should display 2 more reviews on click of More Reviews in ReviewList', async () => {
    let currentView = 2;
    const mockHandleViewMore = jest.fn(() => { currentView += 2 });
    const { rerender } = render(
    <ReviewList
      results={data}
      currentView={currentView}
      handleViewMore={mockHandleViewMore}
      currentFilter={[]}
    />);
    expect(screen.getAllByTestId('review-item')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: /more reviews/i }));
    rerender(
      <ReviewList
      results={data}
      currentView={currentView}
      handleViewMore={mockHandleViewMore}
      currentFilter={[]}
      />);
    await waitFor(() => {
      expect(screen.getAllByTestId('review-item')).toHaveLength(4);
    });
  });

  it('should display 5 bars that signal the rating system', async () => {
    await act(async () => {
      render(<RatingBreakdown itemId="1" totals={mockTotals} updateFilter={() => {}} currentFilter={[]} />);
    });
    const starBars = screen.getAllByTestId('star-bar');
    expect(starBars.length).toBe(5);
  });
})
