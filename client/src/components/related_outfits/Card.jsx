import React, { useState, useEffect } from 'react';
import Stars from '../stars/Stars.jsx';
import Compare from './Compare.jsx';
// import PreviewImage from './PreviewImage.jsx';
import fetchCardData from '../../utils/fetchCardData.js';

const Card = ({
  itemId,
  itemName,
  className,
  action,
  deleteProduct,
  itemFeatures,
  updateMainProduct,
  isVisible,
}) => {
  const [cardImage, setCardImage] = useState(null);
  const [cardData, setCardData] = useState(null);
  const [isCardShown, setIsCardShown] = useState(true);
  const [isCompareShown, setIsCompareShown] = useState(false);
  const getCardData = async () => {
    try {
      const response = await fetchCardData(itemId);
      setCardImage(response.photos);
      setCardData(response);
    } catch (err) {
      console.error('Error getting item details: ', err);
    }
  };
  useEffect(() => {
    if (!cardData) {
      getCardData();
      setIsCardShown(isVisible);
    } else {
      setIsCardShown(isVisible);
    }
  }, [isVisible]);

  const updateImage = (newImage) => {
    setCardImage(newImage);
  };

  let priceString;
  if (cardData && cardData.sale_price && cardData.original_price) {
    priceString = (
      <p className="c-card-price">
        <s className="c-card-price-sales">
          $
          {cardData.sale_price}
        </s>
        {' '}
        $
        {cardData.original_price}
      </p>
    );
  } else if (cardData && cardData.original_price) {
    priceString = (
      <p className="c-card-price">
        $
        {cardData.original_price}
      </p>
    );
  } else {
    priceString = (<p className="c-card-price">NO PRICE :(</p>);
  }

  const compareClickHandler = () => {
    setIsCompareShown(!isCompareShown);
  };

  if (isCompareShown) {
    document.body.classList.add('show-modal');
  } else {
    document.body.classList.remove('show-modal');
  }

  const actionButtons = {
    related: (
      <div
        className="c-card-action-compare"
        data-testid="related-action"
        role="button"
        tabIndex="0"
        onKeyPress={() => compareClickHandler()}
        onClick={() => compareClickHandler()}
      >
        ⭐
      </div>),
    outfits: (
      <div
        className="c-card-action-delete"
        data-testid="outfit-action"
        role="button"
        tabIndex="0"
        onKeyPress={() => deleteProduct(itemId)}
        onClick={() => deleteProduct(itemId)}
      >
        ❌
      </div>),
  };

  if (cardData && isCardShown) {
    return (
      <div
        className={!isCompareShown ? className : 'c-card-no-hover'}
        data-testid="card"
      >
        {isCompareShown ? (
          <Compare
            itemId={cardData.id}
            itemFeatures={itemFeatures}
            cardData={cardData}
            itemName={itemName}
            compareName={cardData.name}
            compareClickHandler={compareClickHandler}
          />
        ) : null}
        <div className="c-card-img-container" data-testid="action">
          <div
            role="button"
            className="c-card-img"
            tabIndex="0"
            data-testid="card-img"
            // onKeyPress={() => updateMainProduct(itemId)}
            // onClick={() => updateMainProduct(itemId)}
            style={{ backgroundImage: `url(${cardImage})` }}
          />
          {actionButtons[action]}
          {/* // <div
              //   role="button"
              //   className="c-card-pre-img"
              //   key={photo.thumbnail_url}
              //   onClick={() => updateImage(photo.thumbnail_url)}
              //   onKeyPress={() => updateImage(photo.thumbnail_url)}
              //   tabIndex="0"
              //   data-testid="card-img"
              //   style={{ backgroundImage: `url(${photo.thumbnail_url})` }}
              // /> */}
          <div className="c-card-pre-img-container">
            {cardData.prePhotos.map((photo, index) => index < 4
              && (
                // <PreviewImage
                //   className="c-card-pre-img"
                //   parentImage={cardImage}
                //   previewImage={photo.thumbnail_url}
                //   updateImage={updateImage}
                // />
                <img
                  className="c-card-pre-img"
                  key={index}
                  src={photo.thumbnail_url}
                  alt={photo.thumbnail_url}
                  onClick={() => updateImage(photo.thumbnail_url)}
                  onKeyPress={() => updateImage(photo.thumbnail_url)}
                />
              ))}
          </div>
        </div>
        <div
          className="c-card-text-container"
          data-testid="card-text"
          role="button"
          tabIndex="0"
          onKeyPress={() => updateMainProduct(itemId)}
          onClick={() => updateMainProduct(itemId)}>
          <div className="c-card-cat" data-testid="card-cat">{cardData.category.toUpperCase()}</div>
          <div
            className="c-card-name"
            role="button"
            tabIndex="0"
            onKeyPress={() => updateMainProduct(itemId)}
            onClick={() => updateMainProduct(itemId)}
          >
            {cardData.name}
          </div>
          <div className="c-card-price">{priceString}</div>
          <div className="c-card-star">
            <Stars itemId={itemId} />

          </div>
        </div>
      </div>
    );
  } if (cardData && !isCardShown) {
    return (<div className="card-hidden" />);
  }
  return (<div data-testid="card" />);
};

export default Card;
