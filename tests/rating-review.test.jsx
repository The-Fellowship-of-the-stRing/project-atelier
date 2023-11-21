import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SortDropDown from '../client/src/components/ratings_review/SortDropDown'
import ReviewList from '../client/src/components/ratings_review/ReviewList'

import data from './test.data.js'

describe('checks Ratings and Review elements', () => {
 it('should render the select tag with a default value set in SortDropDown', () => {
   render(<SortDropDown sort='relevant'/>);
   expect(screen.getByRole('combobox', {value: 'relevant'})).toBeTruthy();
 })
 it('should display 2 more reviews on click of More Reviews in ReviewList', () => {
  render(<ReviewList results={data} />)
 })
})
