import React, { useState, useEffect } from 'react';
import Stars from './Stars.jsx';
import Compare from './Compare.jsx';

const Card = ({
  cardDetails,
  itemName,
  className,
  cardKey,
  action,
  deleteProduct,
  itemFeatures,
  updateMainProduct,
}) => {
  const [cardData, setCardData] = useState(null);
  const [isCompareShown, setIsCompareShown] = useState(false);
  useEffect(() => {
    setCardData(cardDetails);
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
        onKeyPress={() => deleteProduct(cardData.id)}
        onClick={() => deleteProduct(cardData.id)}
      >
        ❌
      </div>),
    add: (
      <div
        className="c-card-action-add"
        role="button"
        tabIndex="0"
        onKeyPress={() => deleteProduct(cardData.id)}
        onClick={() => deleteProduct(cardData.id)}
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
            cardKey={cardKey}
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
            onKeyPress={() => updateMainProduct(cardData.id)}
            onClick={() => updateMainProduct(cardData.id)}
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
            onKeyPress={() => updateMainProduct(cardData.id)}
            onClick={() => updateMainProduct(cardData.id)}
          >
            {cardData.name}
          </div>
          <div className="c-card-price">{priceString}</div>
          <Stars itemId={cardData.id} />
        </div>
      </div>
    ) : (
      <div className="c-card-container" />);
};
export default Card;
