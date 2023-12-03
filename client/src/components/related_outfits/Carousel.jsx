import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';

const Carousel = ({
  action,
  addCard, isAdded, ids,
  deleteProduct, updateMainProduct,
  itemFeatures, itemName, itemId, maxCardCount, topRef,
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
    let cardCount = maxCardCount;
    if (!isAdded && action === 'outfits') {
      cardCount -= 1;
    }
    setVisibleCardCount(cardCount);
    setIndexOfFirstVisibleCard(0);
    setMainId(itemId);
    setVisibleCards(ids.slice(0, cardCount));
    setIsPrevShown(false);
    if (cardCount >= ids.length) {
      setIsNextShown(false);
    } else {
      setIsNextShown(true);
    }
  }, [ids]);

  useEffect(() => {
    if (itemId === mainId) {
      let firstIndex = indexOfFirstVisibleCard;
      let cardCount = maxCardCount;
      if (!isAdded && action === 'outfits') {
        cardCount -= 1;
      }
      setVisibleCardCount(cardCount);
      let lastIndex = firstIndex + cardCount;
      if (lastIndex === ids.length) {
        setVisibleCards(ids.slice(firstIndex, lastIndex));
      } else if (lastIndex < ids.length) {
        setVisibleCards(ids.slice(firstIndex, lastIndex));
      } else {
        firstIndex = Math.max(0, ids.length - maxCardCount);
        lastIndex = ids.length;
        setVisibleCards(ids.slice(firstIndex, lastIndex));
      }
      setIndexOfFirstVisibleCard(firstIndex);
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
  }, [maxCardCount]);

  const updateVisibleCards = (incrementer) => {
    const updatedIndex = indexOfFirstVisibleCard + incrementer;
    setIndexOfFirstVisibleCard(updatedIndex);
    if (incrementer === 1) {
      setVisibleCards([...visibleCards.slice(1),
        ids[indexOfFirstVisibleCard + visibleCards.length]]);
    }
    if (incrementer === -1) {
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
  /* WORK ON IF TIME
    - WANT TO HANDLE CASE WHERE:
      - OUTFITS HAS 1+ PRODUCTS
      - isAdded is false
      - MaxCardCount = 1
    */
  // const [handleOneCard, setHandleOneCard] = useState(false);
  // const updateVisibleCards = (incrementer) => {
  //   let updatedIndex = indexOfFirstVisibleCard + incrementer;
  //   let cardCount = visibleCardCount;
  //   setIndexOfFirstVisibleCard(updatedIndex);
  //   if (incrementer === 1) {
  //     if (!isAdded && visibleCardCount === 0) {
  //       setHandleOneCard(true);
  //       cardCount = 1;
  //       updatedIndex += 1;
  //       setVisibleCardCount(cardCount);
  //       setVisibleCards(ids.slice(0, 1));
  //     } else {
  //       setVisibleCards([...visibleCards.slice(1),
  //         ids[indexOfFirstVisibleCard + visibleCards.length]]);
  //     }
  //   }
  //   if (incrementer === -1) {
  //     if (!isAdded && handleOneCard && visibleCardCount === 1 && indexOfFirstVisibleCard === 1) {
  //       setHandleOneCard(false);
  //       cardCount = 0;
  //       updatedIndex -= 1;
  //       setVisibleCardCount(cardCount);
  //       setVisibleCards([]);
  //     } else {
  //       setVisibleCards([ids[updatedIndex], ...visibleCards.slice(0, visibleCards.length - 1)]);
  //     }
  //   }
  //   if (updatedIndex === 0) {
  //     setIsPrevShown(false);
  //   } else {
  //     setIsPrevShown(true);
  //   }
  //   if (updatedIndex + cardCount === ids.length) {
  //     setIsNextShown(false);
  //   } else {
  //     setIsNextShown(true);
  //   }
  // };

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
        {/* {(!handleOneCard && !isAdded) && addCard} */}
        {!isAdded && addCard}
        {ids.map((id) => (
          <Card
            isVisible={visibleCards.includes(id)}
            itemId={id}
            key={id}
            mainId={itemId}
            deleteProduct={deleteProduct}
            action={action}
            updateMainProduct={updateMainProduct}
            itemFeatures={itemFeatures}
            itemName={itemName}
            topRef={topRef}
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
