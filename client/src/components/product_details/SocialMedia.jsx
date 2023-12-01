import React from 'react';

const SocialMedia = () => {
  const facebook = 'https://www.facebook.com/sharer/sharer.php?u=http://18.209.45.57:8080/';
  const twitter = 'https://twitter.com/intent/tweet?url=http://18.209.45.57:8080/';
  const pinterest = 'https://pinterest.com/pin/create/button/?url=http://18.209.45.57:8080/';
  return (
    <div className="g-socials">
      Share To
      <a href={facebook} target="_blank" rel="noreferrer"> Facebook</a>
      <a href={twitter} target="_blank" rel="noreferrer"> Twitter </a>
      <a href={pinterest} target="_blank" rel="noreferrer"> Pinterest </a>
    </div>
  );
};
export default SocialMedia;

// localhost:8080
// https://twitter.com/intent/tweet?url=http://localhost:3000&text=
// https://pinterest.com/pin/create/button/?url=http://localhost:3000&media=&description=
