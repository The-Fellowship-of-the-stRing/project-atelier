import React from 'react';

const Search = ({ handleSearch }) => (
  <input type="text" aria-label="search bar" onChange={(e) => handleSearch(e.target.value)} />
);

export default Search;
