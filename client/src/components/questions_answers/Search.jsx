import React, { useEffect, useState } from 'react';
import '../../stylesheets/questions_answers/questionsAnswers.css'

const Search = ( {searchTerm, setSearchTerm } ) => {

  const clearSearch = () => {
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
        <button className="k-clear-search"
        onClick={() => clearSearch()}
        >
          Clear Search
        </button>
      </form>
    </div>
  )
}

export default Search