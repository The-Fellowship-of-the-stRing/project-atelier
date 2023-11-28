import React, { useState, useEffect } from 'react';
import Stars from './Stars.jsx';
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
}) => {
  const [cardData, setCardData] = useState(null);
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
    getCardData();
  }, []);

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
        role="button"
        tabIndex="0"
        onKeyPress={() => deleteProduct(itemId)}
        onClick={() => deleteProduct(itemId)}
      >
        ❌
      </div>),
  };

  return cardData
    ? (
      <div className={className}>
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
        <div className="c-card-img-container">
          <div
            role="button"
            tabIndex="0"
            onKeyPress={() => updateMainProduct(itemId)}
            onClick={() => updateMainProduct(itemId)}
          >
            <img className="c-card-img" src={cardData.photos} alt="product-preview" />
          </div>
          {actionButtons[action]}
        </div>

        <div className="c-card-text-container">
          <div className="c-card-cat">{cardData.category.toUpperCase()}</div>
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
          <Stars itemId={itemId} />
        </div>
      </div>
    ) : (
      <div className="c-card-container" />);
};
export default Card;
