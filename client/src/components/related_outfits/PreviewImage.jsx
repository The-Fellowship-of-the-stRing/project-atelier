import React, { useState, useEffect } from 'react';
/* WIP */
const PreviewImage = ({
  parentImage, previewImage, updateImage,
}) => {
  const [cardImage, setCardImage] = useState(null);

  useEffect(() => {
    setCardImage(previewImage);
  }, [parentImage]);
  return (
    <img
      className="c-card-pre-img"
      src={cardImage}
      alt={cardImage}
      onClick={() => {
        updateImage(previewImage);
        setCardImage(parentImage);
      }}
      onKeyPress={() => updateImage(previewImage, parentImage)}
    />
  );
  };

export default PreviewImage;
