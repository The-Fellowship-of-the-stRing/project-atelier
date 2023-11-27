import React from 'react';

const SocialMedia = () => {
  const facebook = 'https://www.facebook.com/sharer/sharer.php?u=http://localhost:8080';
  const twitter = 'https://twitter.com/intent/tweet?url=http://localhost:8080';
  const pinterest = 'https://pinterest.com/pin/create/button/?url=http://localhost:8080';
  return (

    <div className="g-socials">
      <a href={facebook}> Twitter </a>
      <a href={twitter}> Twitter </a>
      <a href={pinterest}> Twitter </a>
    </div>

  );
};
export default SocialMedia;

// localhost:8080
// https://twitter.com/intent/tweet?url=http://localhost:3000&text=
// https://pinterest.com/pin/create/button/?url=http://localhost:3000&media=&description=
