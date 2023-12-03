import React, { useState, useEffect } from 'react';

const PreviewImage = ({
  parentImage, previewImage, updateImage,
}) => {
  const [cardImage, setCardImage] = useState(null);

  useEffect(() => {
    setCardImage(previewImage);
  }, []);
  return (
    <div
      className="c-card-pre-div"
      role="button"
      tabIndex="0"
      onClick={(event) => {
        updateImage(cardImage);
        setCardImage(parentImage);
        event.stopPropagation();
      }}
      onKeyPress={(event) => {
        updateImage(cardImage);
        setCardImage(parentImage);
        event.stopPropagation();
      }}
    >
      <img
        className="c-card-pre-img"
        src={cardImage}
        alt={cardImage}
      />
    </div>
  );
};

export default PreviewImage;
