import React, { useState, useEffect } from 'react';
import Stars from '../stars/Stars.jsx';
import Compare from './Compare.jsx';
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
  const [cardData, setCardData] = useState(null);
  const [isCardShown, setIsCardShown] = useState(true);
  const [isCompareShown, setIsCompareShown] = useState(false);
  const getCardData = async () => {
    try {
      const response = await fetchCardData(itemId);
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
      <div className={className} data-testid="card">
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
            onKeyPress={() => updateMainProduct(itemId)}
            onClick={() => updateMainProduct(itemId)}
            style={{ backgroundImage: `url(${cardData.photos})` }}
          />
          {actionButtons[action]}
        </div>
        <div className="c-card-text-container" data-testid="card-text">
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
