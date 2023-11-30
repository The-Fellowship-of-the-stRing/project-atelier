import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import Search from '../components/navbar/Search.jsx';
import icon from '../assets/images/CC_icon.png';

import handleRef from '../utils/handleRef.js';

import '../stylesheets/navbar/navbar.css';

const NavBar = ({ topRef }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (query) => {
    if (query.length > 2) {
      setSearchTerm(searchTerm + query);
    } else {
      setSearchTerm('');
    }
  };

  return (
    <div className="l-navbar-container">
      <div className="l-navbar-main">
        <div
          role="button"
          onKeyDown={() => handleRef(topRef)}
          tabIndex="0"
          style={{ backgroundImage: `url(${icon})` }}
          className="l-navbar-icon"
          alt="click crate icon"
          onClick={() => handleRef(topRef)}
        />
        <div className="l-navbar-search-container">
          <Search handleSearch={handleSearch} />
          <GoSearch className="l-navbar-search-icon" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
