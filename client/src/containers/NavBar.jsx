import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';

import '../stylesheets/navbar/navbar.css';

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="l-navbar-container">
      <div className="l-navbar-main">
        <GoSearch />
      </div>
    </div>
  );
};

export default NavBar;
