import React from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import handleRef from '../utils/handleRef.js';

import '../stylesheets/footer/footer.css';

const Footer = ({ topRef }) => (
  <div className="l-footer-main">
    <IoIosArrowUp
      role="button"
      onClick={() => handleRef(topRef)}
      onKeyDown={() => handleRef(topRef)}
      tabIndex="0"
      arial-text="back to top"
      className="l-back-to-top"
    />
    <div className="l-footer-links">
      <a href="https://github.com/LukeLarson2" alt="link to git hub" className="l-github-link">Luke Larson</a>
      |
      <a href="https://github.com/clee4037" alt="link to git hub" className="l-github-link">Christian Lee</a>
      |
      <a href="https://github.com/kssampson" alt="link to git hub" className="l-github-link">Kyle Sampson</a>
      |
      <a href="https://github.com/gordon1213" alt="link to git hub" className="l-github-link">Gordon Chiu</a>
    </div>
    <p className="l-footer-text">©2023 Click Crate LLC, the Click Crate logo, and all associated logos are owned by Click Crate LLC.</p>
    <p className="l-footer-text">The ratings icon is a registered trademark of the Entertainment Software Association. All rights reserved.</p>
  </div>
);

export default Footer;
