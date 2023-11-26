import React,{useState, useEffect} from 'react';
import getProductDataById from '../../utils/getProductDataById.js';
import getStyleDataById from '../../utils/getStyleDataById.js';
import Stars from './Stars.jsx';
import Compare from './Compare.jsx';

const Card = ( {cardDetails, itemName, className, cardKey, action, addProduct, deleteProduct, itemFeatures, updateMainProduct} ) => {
  const [cardData, setCardData] = useState(null);
  const [isCompareShown, setIsCompareShown] = useState(false);
  useEffect(() => {
    setCardData(cardDetails);
  }, [])

  let priceString =
    (cardData && cardData.sale_price && cardData.original_price)
      ? (<p className="c-card-price"><s className="c-card-price-sales">${cardData.sale_price}</s> ${cardData.original_price}</p>)
    : (cardData && cardData.original_price)
      ? (<p className="c-card-price">${cardData.original_price} </p>)
    : (<p className="c-card-price">NO PRICE :(</p>);

  const compareClickHandler = () => {
    setIsCompareShown(!isCompareShown);
  }

  if(isCompareShown) {
    document.body.classList.add('show-modal');
  } else {
    document.body.classList.remove('show-modal')
  }

  let actionButtons = {
    related: (<p className="c-card-action-compare" onClick={() => compareClickHandler()}>⭐</p>),
    outfits: (<p className="c-card-action-delete" onClick={() => deleteProduct(itemId)}>❌</p>)
  }

  return cardData ?
    (
      <div className={className} >
        {isCompareShown ? <Compare itemId={cardData.id} cardKey={cardKey} itemFeatures={itemFeatures} cardData={cardData} itemName={itemName} compareName={cardData.name} compareClickHandler={compareClickHandler} /> : null}
        <div className="c-card-img-container">
          <img className="c-card-img" onClick={() => updateMainProduct(cardData.id)}
          src={cardData.photos} />
          {actionButtons[action]}
        </div>

        <div className="c-card-text-container">
          <div className="c-card-cat">{cardData.category.toUpperCase()}</div>
          <div className="c-card-name" onClick={() => updateMainProduct(cardData.id)}>{cardData.name}</div>
          <div className="c-card-price">{priceString}</div>
          <Stars itemId={cardData.id} />
        </div>
      </div>
    ) : (
      <div className="c-card-container"></div>);
}
export default Card