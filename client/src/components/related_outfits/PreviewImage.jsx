import React, { useState, useEffect } from 'react';
/* WIP */
const PreviewImage = ({
  parentImage, previewImage, updateImage,
}) => {
  const [cardImage, setCardImage] = useState(null);

  useEffect(() => {
    setCardImage(previewImage);
  }, []);
  return (
    <img
      className="c-card-pre-img"
      src={cardImage}
      alt={cardImage}
      onClick={() => {
        updateImage(cardImage);
        setCardImage(parentImage);
      }}
      onKeyPress={() => updateImage(previewImage, parentImage)}
    />
  );
  };

export default PreviewImage;
