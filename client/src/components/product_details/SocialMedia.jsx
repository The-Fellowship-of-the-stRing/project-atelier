import React from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaSquareXTwitter, FaSquarePinterest } from 'react-icons/fa6';
import '../../stylesheets/product_details/socialMedia.css';

const SocialMedia = () => {
  const facebook = 'https://www.facebook.com/sharer/sharer.php?u=http://18.209.45.57:8080/';
  const twitter = 'https://twitter.com/intent/tweet?url=http://18.209.45.57:8080/';
  const pinterest = 'https://pinterest.com/pin/create/button/?url=http://18.209.45.57:8080/';
  return (
    <div className="g-socials" style={{ marginBlockStart: '1em' }}>
      <a className="g-social-icon" href={facebook} target="_blank" rel="noreferrer">
        <FaFacebookSquare style={{ color: '#256EFF' }} />
      </a>
      <a className="g-social-icon" href={twitter} target="_blank" rel="noreferrer">
        <FaSquareXTwitter style={{ color: 'black' }} />
      </a>
      <a className="g-social-icon" href={pinterest} target="_blank" rel="noreferrer">
        <FaSquarePinterest style={{ color: '#c8232c' }} />
      </a>
    </div>
  );
};
export default SocialMedia;

// localhost:8080
// https://twitter.com/intent/tweet?url=http://localhost:3000&text=
// https://pinterest.com/pin/create/button/?url=http://localhost:3000&media=&description=
