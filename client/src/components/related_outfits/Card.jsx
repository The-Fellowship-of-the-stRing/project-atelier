import React, { useState, useEffect } from 'react';
import Stars from '../stars/Stars.jsx';
import Compare from './Compare.jsx';
import PreviewImage from './PreviewImage.jsx';
import fetchCardData from '../../utils/fetchCardData.js';
import handleRef from '../../utils/handleRef.js';

const Card = ({
  itemId,
  action,
  deleteProduct,
  itemFeatures,
  updateMainProduct,
  isVisible,
  topRef,
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
  }, [isVisible, cardImage]);

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
  const validImageUrl = (imageUrl) => {
    const thumbnailImage = imageUrl || 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg';
    return thumbnailImage.slice(thumbnailImage.indexOf('https:'));
  };
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
        onKeyPress={(event) => {
          compareClickHandler();
          event.stopPropagation();
        }}
        onClick={(event) => {
          compareClickHandler();
          event.stopPropagation();
        }}
        aria-label="view compare"
      >
        ⭐
      </div>),
    outfits: (
      <div
        className="c-card-action-delete"
        data-testid="outfit-action"
        role="button"
        tabIndex="0"
        onKeyPress={(event) => {
          deleteProduct(itemId);
          event.stopPropagation();
        }}
        onClick={(event) => {
          deleteProduct(itemId);
          event.stopPropagation();
        }}
        aria-label="remove item from outfit"
      >
        ❌
      </div>),
  };

  if (cardData && isCardShown) {
    return (
      <div
        data-testid="card"
        className={!isCompareShown ? 'c-card' : 'c-card-no-hover'}
        onKeyPress={() => {
          updateMainProduct(itemId);
          handleRef(topRef);
        }}
        onClick={() => {
          updateMainProduct(itemId);
          handleRef(topRef);
        }}
        role="button"
        tabIndex="0"
      >
        {isCompareShown ? (
          <Compare
            itemId={cardData.id}
            itemFeatures={itemFeatures}
            cardData={cardData}
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
            style={{ backgroundImage: `url(${cardImage})` }}
            aria-label="view product"
          />
          {actionButtons[action]}
          <div className={Object.keys(cardData.prePhotos).length >= 4 ? 'c-card-pre-img-container' : 'c-card-pre-img-container-small'}>
            {cardData.prePhotos.map((photo) => photo.thumbnail_url
              && (
                <PreviewImage
                  className="c-card-pre-img"
                  key={photo.thumbnail_url}
                  parentImage={cardImage}
                  previewImage={validImageUrl(photo.thumbnail_url)}
                  updateImage={updateImage}
                />
              ))}
          </div>
        </div>
        <div
          className="c-card-text-container"
          data-testid="card-text"
          role="button"
          tabIndex="0"
        >
          <div className="c-card-cat" data-testid="card-cat">{cardData.category.toUpperCase()}</div>
          <div
            className="c-card-name"
            role="button"
            tabIndex="0"
            aria-label="view card details"
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
