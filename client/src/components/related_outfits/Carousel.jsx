import React, { useRef, useState, useEffect } from 'react';

const Carousel = ({
  cards, pWidth,
}) => {
  const ref = useRef(null);
  // const [mainProductId, setMainProductId] = useState(null);
  // const [relatedIds, setRelatedIds] = useState(null);
  const [allCards, setAllCards] = useState(null);
  const [visibleCards, setVisibleCards] = useState(null);
  const [visibleCardCount, setVisibleCardCount] = useState(null);
  const [indexOfFirstVisibleCard, setIndexOfFirstVisibleCard] = useState(0);
  const [isNextShown, setIsNextShown] = useState(false);
  const [isPrevShown, setIsPrevShown] = useState(false);

  // Left and right margins of card list is 20px each
  // Each card is 200px wide with right-margin of 10px
  const getCardCount = (w) => Math.floor((w - 40) / 210);

  // const updateCardsBasedOnWidth = () => {
  //   if (allCards) {
  //     const newCardCount = getCardCount(pWidth);
  //     setVisibleCards(
  //       allCards.slice(indexOfFirstVisibleCard, indexOfFirstVisibleCard + newCardCount),
  //     );
  //     setVisibleCardCount(newCardCount);
  //   }
  // };

  useEffect(() => {
    setAllCards(cards);
    // setMainProductId(itemId);
    setIndexOfFirstVisibleCard(0);
    const cardCount = getCardCount(pWidth);
    setVisibleCardCount(cardCount);
    setVisibleCards(cards.slice(0, cardCount));
    if (visibleCardCount >= cards.length) {
      setIsNextShown(false);
    } else {
      setIsNextShown(true);
    }
    setIsPrevShown(false);
  }, [pWidth, cards]);

  const updateVisibleCards = (incrementer) => {
    const updatedIndex = indexOfFirstVisibleCard + incrementer;
    setIndexOfFirstVisibleCard(updatedIndex);
    if (incrementer === 1) {
      setVisibleCards([...visibleCards.slice(1),
        allCards[indexOfFirstVisibleCard + visibleCards.length]]);
    } else {
      setVisibleCards([allCards[updatedIndex], ...visibleCards.slice(0, visibleCards.length - 1)]);
    }
    if (updatedIndex === 0) {
      setIsPrevShown(false);
    } else {
      setIsPrevShown(true);
    }
    if (updatedIndex + visibleCardCount === allCards.length) {
      setIsNextShown(false);
    } else {
      setIsNextShown(true);
    }
  };

  return visibleCards && visibleCardCount ? (
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
        {visibleCards}
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
