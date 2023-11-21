import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SortDropDown from '../client/src/components/ratings_review/SortDropDown'

describe('checks Ratings and Review elements', () => {
 it('should render the select tag with a default value set in SortDropDown', () => {
   render(<SortDropDown sort='relevant'/>);
   expect(screen.getByRole('combobox', {value: 'relevant'})).toBeTruthy();
 })
})
