import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';

const Carousel = ({
  action,
  addCard, isAdded, ids,
  deleteProduct, updateMainProduct,
  itemFeatures, itemName, itemId, maxCardCount,
}) => {
  const [visibleCards, setVisibleCards] = useState(null);
  const [visibleCardCount, setVisibleCardCount] = useState(null);
  const [indexOfFirstVisibleCard, setIndexOfFirstVisibleCard] = useState(null);
  const [isNextShown, setIsNextShown] = useState(false);
  const [isPrevShown, setIsPrevShown] = useState(false);

  // Left and right margins of card list is 20px each
  // Each card is 200px wide with right-margin of 10px
  // const getCardCount = (w) => Math.floor((w - 40) / 210);
  useEffect(() => {
    if (!indexOfFirstVisibleCard) {
      setIndexOfFirstVisibleCard(0);
    }
    // const cardCount = getCardCount(pWidth);
    console.log("3", maxCardCount, action);
    setVisibleCardCount(maxCardCount);
    setVisibleCards(ids.slice(0, maxCardCount)); // NEED TO HANDLE CASE WHEN NOT ON FIRST CARD
    if (maxCardCount >= ids.length) {
      setIsNextShown(false);
    } else {
      setIsNextShown(true);
    }
    setIsPrevShown(false);
  }, [maxCardCount, isAdded]);

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
    <div>No Related Items</div>
  );
};

export default Carousel;
