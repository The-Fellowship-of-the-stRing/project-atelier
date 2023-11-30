import React from 'react';
import '../../stylesheets/questions_answers/Search.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const Search = ({ searchTerm, setSearchTerm }) => {
  const clearSearch = (e) => {
    e.preventDefault();
    setSearchTerm('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearSearch();
  };

  const magnifyingGlassStyle = {
    opacity: searchTerm.length > 2 ? 0.3 : 1,
    transition: 'opacity 0.3s ease',
  };

  return (
    <div className="k-questions-answers-search">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="k-search-input"
          placeholder="Have a question? Search for answers…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaMagnifyingGlass
          className="k-mag-glass-search"
          style={magnifyingGlassStyle}
        />
        <button
          type="button"
          className="k-clear-search-btn"
          onClick={(e) => clearSearch(e)}
        >
          Clear Search
        </button>
      </form>
    </div>
  );
};

export default Search;
