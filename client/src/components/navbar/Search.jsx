import React from 'react';

const Search = ({ handleSearch }) => (
  <input type="text" onChange={(e) => handleSearch(e.target.value)} />
);

export default Search;
