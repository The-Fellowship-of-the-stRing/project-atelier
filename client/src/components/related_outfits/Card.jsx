import React, { useState, useEffect } from 'react';
import Stars from './Stars.jsx';
import Compare from './Compare.jsx';
import getProductDataById from '../../utils/getProductDataById.js';
import getStyleDataById from '../../utils/getStyleDataById.js';

const Card = ({
  itemId,
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
    const fetchCardData = async () => {
      try {
        const productData = await getProductDataById(itemId);
        const styleData = await getStyleDataById(itemId);
        console.log(productData, styleData);
        if(productData && styleData) {
          let response = {
            name: productData.name || "NO NAME",
            category: productData.category || "NO CAT",
            features: productData.features || []
          };
          /* USE DEFAULT STYLE || FIRST STYLE */
          for (let i = 0; i < styleData.length; i++) {
            let style = styleData[i];
            if (i === 0 || style["default?"]) {
              response.photos = style.photos[0].thumbnail_url || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
              response.original_price = style.original_price;
              response.sale_price = style.sale_price;
            }
          }
          console.log(response);
          return setCardData(response);
        }
      } catch (err) {
        console.error('Error getting item details: ', err);
      }
    }
    fetchCardData();
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
