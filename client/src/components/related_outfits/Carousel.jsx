import React, {useLayoutEffect, useRef, useState, useEffect}  from 'react';
import Card from './Card.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';
import fetchCardData from '../../utils/fetchCardData.js';
import getProductDataById from '../../utils/getProductDataById.js';
import getStyleDataById from '../../utils/getStyleDataById.js';

const Carousel = ( {itemId, cardIds, itemFeatures, itemName, updateMainProduct, cards, pWidth} ) => {
  const ref = useRef(null);
  const [mainProductId, setMainProductId] = useState(null);
  const [relatedIds, setRelatedIds] = useState(null);
  const [allCards, setAllCards] = useState(null);
  const [visibleCards, setVisibleCards] = useState(null);
  const [visibleCardCount, setVisibleCardCount] = useState(null)
  const [indexOfFirstVisibleCard, setIndexOfFirstVisibleCard] = useState(0);
  const [isNextShown, setIsNextShown] = useState(false);
  const [isPrevShown, setIsPrevShown] = useState(false);
  console.log(cards);
  const getCardCount = (w) => {
    // Left and right margins of card list is 20px each
    // Each card is 200px wide with right-margin of 10px
    return Math.floor((w - 40) / 210);
  }
  const updateCardsBasedOnWidth = () => {
    if(allCards) {
      let newCardCount = getCardCount(pWidth);
      setVisibleCards(allCards.slice(indexOfFirstVisibleCard, indexOfFirstVisibleCard + newCardCount));
      setVisibleCardCount(newCardCount);
    }
  }

  useEffect(() => {
    setAllCards(cards);
    setMainProductId(itemId);
    setIndexOfFirstVisibleCard(0);
    let cardCount = getCardCount(pWidth);
    setVisibleCardCount(cardCount);
    setVisibleCards(cards.slice(0, cardCount));
    (visibleCardCount >= cards.length) ? setIsNextShown(false)
      : setIsNextShown(true);
    setIsPrevShown(false);
  }, [pWidth, cards]);

  const updateVisibleCards = (incrementer) => {
    let updatedIndex = indexOfFirstVisibleCard + incrementer;
    setIndexOfFirstVisibleCard(updatedIndex);
    incrementer === 1 ? setVisibleCards([...visibleCards.slice(1), allCards[indexOfFirstVisibleCard+visibleCards.length]])
      : setVisibleCards([allCards[updatedIndex], ...visibleCards.slice(0,visibleCards.length-1)]);
    updatedIndex === 0 ? setIsPrevShown(false)
      : setIsPrevShown(true);
    (updatedIndex + visibleCardCount === allCards.length) ? setIsNextShown(false)
      : setIsNextShown(true);
  };

  return visibleCards&&visibleCardCount ? (
    <div className="c-related-container" ref={ref}>
      {isPrevShown && <p className="c-prev"onClick={() => updateVisibleCards(-1)}>{'<'}</p>}
      <div className="c-cards">
        {visibleCards}
      </div>
      {isNextShown && <p className="c-next"onClick={() => updateVisibleCards(1)}>{'>'}</p>}
    </div>
  ) : (
    <div ref={ref}>No Related Items</div>
  )
}

export default Carousel