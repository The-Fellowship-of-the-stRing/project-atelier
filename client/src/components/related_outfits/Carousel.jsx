import React, { useRef, useState, useEffect } from 'react';
import Card from './Card.jsx';

const Carousel = ({
  cards, action, pWidth,
  addCard, isAdded, ids,
  deleteProduct, updateMainProduct,
  itemFeatures, itemName, itemId,
}) => {
  const ref = useRef(null);

  const [visibleCards, setVisibleCards] = useState(null);
  const [visibleCardCount, setVisibleCardCount] = useState(null);
  const [indexOfFirstVisibleCard, setIndexOfFirstVisibleCard] = useState(0);
  const [isNextShown, setIsNextShown] = useState(false);
  const [isPrevShown, setIsPrevShown] = useState(false);

  // Left and right margins of card list is 20px each
  // Each card is 200px wide with right-margin of 10px
  const getCardCount = (w) => Math.floor((w - 40) / 210);
  useEffect(() => {
    setIndexOfFirstVisibleCard(0);
    const cardCount = getCardCount(pWidth);
    setVisibleCardCount(cardCount);
    setVisibleCards(ids.slice(0, cardCount));
    if (visibleCardCount >= ids.length) {
      setIsNextShown(false);
    } else {
      setIsNextShown(true);
    }
    setIsPrevShown(false);
  }, [pWidth, cards, isAdded, ids]);

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
    <div className="c-related-container" ref={ref}>
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
        {visibleCards.map((id) => (
          <Card
            className="c-card"
            temId={id}
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
    <div ref={ref}>No Related Items</div>
  );
};

export default Carousel;
