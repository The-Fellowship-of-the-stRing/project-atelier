import React from 'react';

import '../../stylesheets/ratings_review/starBar.css'

const StarBar = ({value, total, current}) => {

  return (
    <div className="l-star-bar-main">
      <div className="l-star-bar-text">{current} stars</div>
      <div className='l-star-bar-container'>
        <div className="l-star-bar-total" />
        <div className="l-star-bar-value" style={{width: `${(value/total) * 100}%`}}/>
      </div>
    </div>
  )
}

export default StarBar;