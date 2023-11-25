import React, { useEffect, useState } from 'react';
import '../../stylesheets/questions_answers/Search.css'

const Search = ( { resultsToShow, searchTerm, setSearchTerm } ) => {

  const clearSearch = (e) => {
    e.preventDefault();
    setSearchTerm('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    clearSearch()
  }

  return (
    <div className="k-questions-answers-search">
      <form onSubmit={e => handleSubmit(e)}>
        <input className="k-search-input"
        placeholder="Have a question? Search for answers…"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="k-clear-search-btn"
        onClick={(e) => clearSearch(e)}
        >
          Clear Search
        </button>
      </form>
    </div>
  )
}

export default Search