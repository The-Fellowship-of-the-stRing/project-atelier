import React from 'react';

const SocialMedia = () => {
  const facebook = 'https://www.facebook.com/sharer/sharer.php?u=http://localhost:8080';
  const twitter = 'https://twitter.com/intent/tweet?url=http://localhost:8080';
  const pinterest = 'https://pinterest.com/pin/create/button/?url=http://localhost:8080';
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
