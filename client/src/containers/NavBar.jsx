import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import Search from '../components/navbar/Search';
import icon from '../assets/images/CC_icon.png';

import '../stylesheets/navbar/navbar.css';

const NavBar = () => {
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
        <img src={icon} className="l-navbar-icon" alt="click crate icon" />
        <div className="l-navbar-search-container">
          <Search handleSearch={handleSearch} />
          <GoSearch className="l-navbar-search-icon" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
