import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';

const Carousel = ({
  action,
  addCard, isAdded, ids,
  deleteProduct, updateMainProduct,
  itemFeatures, itemName, itemId, maxCardCount,
}) => {
  const [mainId, setMainId] = useState(null);
  const [visibleCards, setVisibleCards] = useState(null);
  const [visibleCardCount, setVisibleCardCount] = useState(null);
  const [indexOfFirstVisibleCard, setIndexOfFirstVisibleCard] = useState(null);
  const [isNextShown, setIsNextShown] = useState(null);
  const [isPrevShown, setIsPrevShown] = useState(null);

  // Left and right margins of card list is 20px each
  // Each card is 200px wide with right-margin of 10px
  // const getCardCount = (w) => Math.floor((w - 40) / 210);
  useEffect(() => {
    setVisibleCardCount(maxCardCount);

    if (itemId !== mainId) {
      setMainId(itemId);
      setIndexOfFirstVisibleCard(0);
      setVisibleCards(ids.slice(0, maxCardCount));
      setIsPrevShown(null);
      if (maxCardCount === ids.length) {
        setIsNextShown(false);
      } else {
        setIsNextShown(true);
      }
    } else {
      let firstIndex = indexOfFirstVisibleCard;
      let lastIndex = firstIndex + maxCardCount;
      let newVisibleCards;
      if (lastIndex === ids.length) {
        newVisibleCards = ids.slice(firstIndex, lastIndex);
      } else if (lastIndex < ids.length) {
        newVisibleCards = ids.slice(firstIndex, lastIndex);
      } else {
        firstIndex = Math.max(0, ids.length - maxCardCount);
        lastIndex = ids.length;
        newVisibleCards = ids.slice(firstIndex, lastIndex);
      }
      setIndexOfFirstVisibleCard(firstIndex);
      setVisibleCards(newVisibleCards);

      if (lastIndex === ids.length) {
        setIsNextShown(false);
      } else {
        setIsNextShown(true);
      }
      if (firstIndex === 0) {
        setIsPrevShown(false);
      } else {
        setIsPrevShown(true);
      }
    }
  }, [maxCardCount, isAdded, ids]);

  const updateVisibleCards = (incrementer) => {
    const updatedIndex = indexOfFirstVisibleCard + incrementer;
    setIndexOfFirstVisibleCard(updatedIndex);
    if (incrementer === 1) {
      setVisibleCards([...visibleCards.slice(1),
        ids[indexOfFirstVisibleCard + visibleCards.length]]);
    } else {
      setVisibleCards([ids[updatedIndex], ...visibleCards.slice(0, visibleCards.length - 1)]);
    }
    if (updatedIndex === 0) {
      setIsPrevShown(false);
    } else {
      setIsPrevShown(true);
    }
    if (updatedIndex + visibleCardCount === ids.length) {
      setIsNextShown(false);
    } else {
      setIsNextShown(true);
    }
  };

  return ids && visibleCards ? (
    <div className="c-carousel-container">
      {isPrevShown && (
        <button
          className="c-prev"
          type="button"
          onKeyPress={() => updateVisibleCards(-1)}
          onClick={() => updateVisibleCards(-1)}
        >
          {'<'}
        </button>
      )}
      <div className="c-cards">
        {!isAdded && addCard}
        {ids.map((id) => (
          <Card
            className="c-card"
            data-testid="card"
            isVisible={visibleCards.includes(id)}
            itemId={id}
            key={id}
            mainId={itemId}
            deleteProduct={deleteProduct}
            action={action}
            updateMainProduct={updateMainProduct}
            itemFeatures={itemFeatures}
            itemName={itemName}
          />
        ))}
      </div>
      {isNextShown && (
        <button
          className="c-next"
          type="button"
          onKeyPress={() => updateVisibleCards(1)}
          onClick={() => updateVisibleCards(1)}
        >
          {'>'}
        </button>
      )}
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Carousel;
