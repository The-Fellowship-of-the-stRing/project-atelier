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

  // useEffect(() => {
  //   setVisibleCardCount(maxCardCount);
  //   if (itemId !== mainId) {
  //     setMainId(itemId);
  //     setIndexOfFirstVisibleCard(0);
  //     setVisibleCards(ids.slice(0, maxCardCount));
  //     setIsPrevShown(false);
  //     if (maxCardCount >= ids.length) {
  //       setIsNextShown(false);
  //     } else {
  //       setIsNextShown(true);
  //     }
  //   } else {
  //     let firstIndex = indexOfFirstVisibleCard;
  //     let lastIndex = firstIndex + maxCardCount;
  //     let newVisibleCards;
  //     if (lastIndex === ids.length) {
  //       newVisibleCards = ids.slice(firstIndex, lastIndex);
  //     } else if (lastIndex < ids.length) {
  //       newVisibleCards = ids.slice(firstIndex, lastIndex);
  //     } else {
  //       firstIndex = Math.max(0, ids.length - maxCardCount);
  //       lastIndex = ids.length;
  //       newVisibleCards = ids.slice(firstIndex, lastIndex);
  //     }
  //     setIndexOfFirstVisibleCard(firstIndex);
  //     setVisibleCards(newVisibleCards);

  //     if (lastIndex === ids.length) {
  //       setIsNextShown(false);
  //     } else {
  //       setIsNextShown(true);
  //     }
  //     if (firstIndex === 0) {
  //       setIsPrevShown(false);
  //     } else {
  //       setIsPrevShown(true);
  //     }
  //   }
  // }, [maxCardCount, isAdded, ids]);

  /* ---------------------- REFACTOR ---------------------- */
  useEffect(() => {
    let cardCount = maxCardCount;
    if (!isAdded && action === 'outfits') {
      cardCount -= 1;
    }
    setVisibleCardCount(cardCount);
    setIndexOfFirstVisibleCard(0);
    setMainId(itemId);
    setVisibleCards(ids.slice(0, maxCardCount));
    setIsPrevShown(false);
    if (maxCardCount >= ids.length) {
      setIsNextShown(false);
    } else {
      setIsNextShown(true);
    }
  }, [ids]);

  useEffect(() => {
    if (itemId === mainId) {
      let firstIndex = indexOfFirstVisibleCard;
      let lastIndex = firstIndex + maxCardCount;
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
  /*
  useEffect(() => {
    if (isAdded !== null && action === "outfits") {
      let updatedCardCount;
      let firstIndex;

      if (isAdded) {
        updatedCardCount = visibleCardCount - 1;
        if (indexOfFirstVisibleCard + maxCardCount === ids.length) {
          firstIndex = indexOfFirstVisibleCard + 1;
          // setVisibleCardCount(updatedCardCount);
          // setIndexOfFirstVisibleCard(firstIndex);
          // setVisibleCards(ids.slice(firstIndex, firstIndex + updatedCardCount));
        }
        if (indexOfFirstVisibleCard + maxCardCount < ids.length) {
          firstIndex = indexOfFirstVisibleCard;
          // setVisibleCardCount(updatedCardCount);
          // setIndexOfFirstVisibleCard(firstIndex);
          // setVisibleCards(ids.slice(firstIndex, firstIndex + updatedCardCount));
        }
      } else { // !isAdded
      // [1,2,3,4] curr [A,1,2] maxCount = 3 isAdd = true
      // -> isAdd = false;
      // [A,1,2]
        updatedCardCount = Math.max(visibleCardCount + 1, ids.length);
        if (indexOfFirstVisibleCard === 0) {
          firstIndex = indexOfFirstVisibleCard;
        }
        if (indexOfFirstVisibleCard + maxCardCount <= ids.length) {
          firstIndex = indexOfFirstVisibleCard - 1;
        }
        // if (indexOfFirstVisibleCard + maxCardCount < ids.length) {
        //   firstIndex = indexOfFirstVisibleCard;
        // }
      }

      setVisibleCardCount(updatedCardCount);
      setIndexOfFirstVisibleCard(firstIndex);
      setVisibleCards(ids.slice(firstIndex, firstIndex + updatedCardCount));
    }
  }, [isAdded]); */

  /* ^^^^^^^^^^^^^^^^^^^^^^ REFACTOR ^^^^^^^^^^^^^^^^^^^^^^ */

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
