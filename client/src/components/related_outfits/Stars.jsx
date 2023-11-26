import React, { useState, useEffect } from 'react';
import getItemDetails from '../../utils/getItemDetails.js';
import '../../stylesheets/related_outfits/relatedOutfits.css';
import '../../stylesheets/stars/stars.css';

const Stars = ({ itemId }) => {
  const [ratingDisplay, setRatingDisplay] = useState(0);

  const starLength = Array.from(Array(5));

  const roundRating = (value) => {
    const prevDec = (value % 1) * 100;
    const newDec = Math.floor((prevDec + 12.5) / 25) * 0.25;
    const prevWholeNum = Math.floor(value);
    return prevWholeNum + newDec;
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const getAverage = await getItemDetails(itemId);
        const averageRating = await roundRating(getAverage);
        setRatingDisplay(averageRating);
      } catch (err) {
        console.error('Error getting item details: ', err);
      }
    };

    fetchDetails();
  }, [itemId]);

  return (
    <div id="stars-main-container" className="c-card-star">
      <div id="stars-outline-container">
        {
        starLength.map((star, index) => (
          <div key={index} id="star-outline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </div>
        ))
       }
      </div>
      <div id="stars-filled-container" style={{ width: `${ratingDisplay * 20}%` }}>
        {
        starLength.map((star, index) => (
          <div key={index} id="star-fill">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" width="1em" height="1em">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
          </div>
        ))
       }
      </div>
    </div>
  );
};

export default Stars;
