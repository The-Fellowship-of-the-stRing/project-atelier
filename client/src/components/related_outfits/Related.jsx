import React, {useLayoutEffect, useRef, useState, useEffect}  from 'react';
import Card from './Card.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';
import getProductDataById from '../../utils/getProductDataById.js';
import getStyleDataById from '../../utils/getStyleDataById.js';

const Related = ( {itemId, itemFeatures, itemName, updateMainProduct} ) => {
  const ref = useRef(null);
  const [mainProductId, setMainProductId] = useState(null);
  const [width, setWidth] = useState(0);
  const [relatedIds, setRelatedIds] = useState(null);
  const [allCards, setAllCards] = useState(null);
  const [visibleCards, setVisibleCards] = useState(null);
  const [visibleCardCount, setVisibleCardCount] = useState(null)
  const [indexOfFirstVisibleCard, setIndexOfFirstVisibleCard] = useState(0);
  const [isNextShown, setIsNextShown] = useState(true);
  const [isPrevShown, setIsPrevShown] = useState(false);

  const fetchCardData = async (id) => {
    try {
      const productData = await getProductDataById(id);
      const styleData = await getStyleDataById(id);
        let response = {
          id: id,
          name: productData.name || "NO NAME",
          category: productData.category || "NO CAT",
          features: productData.features || []
        };
        for (let i = 0; i < styleData.length; i++) {
          let style = styleData[i];
          if (i === 0 || style["default?"]) {
            response.photos = style.photos[0].thumbnail_url || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
            response.original_price = style.original_price;
            response.sale_price = style.sale_price;
          }
        }
        return response;
    } catch (err) {
      console.error('Error getting item details: ', err);
    }
  }
  const fetchRelatedIds = async () => {
    try {
      if (itemId !== mainProductId) {
        setMainProductId(itemId);
        setIndexOfFirstVisibleCard(0);
        setIsNextShown(true);
        setIsPrevShown(false);
        const fetchedIds = await getRelatedItems(itemId);
        let cards = await Promise.all(fetchedIds.map((id,index) => fetchCardData(id)));
        let cardElements = cards.map((card, index) =>
          <Card className={`c-card c-card-${index}`} cardDetails={card} cardKey={card.id+itemId} key={card.id+itemId} itemName={itemName} itemFeatures={itemFeatures} action="related" updateMainProduct={updateMainProduct}/>);
        setRelatedIds(fetchedIds);
        setAllCards(cardElements);
        setVisibleCards(cardElements.slice(0, getCardCount(ref.current.offsetWidth)));
      } else if (!allCards) {
        const fetchedIds = await getRelatedItems(itemId);
        let cards = await Promise.all(fetchedIds.map((id,index) => fetchCardData(id)));
        let cardElements = cards.map((card, index) =>
          <Card className={`c-card c-card-${index}`} cardDetails={card} cardKey={card.id+itemId} key={card.id+itemId} itemName={itemName} itemFeatures={itemFeatures} action="related" updateMainProduct={updateMainProduct}/>);
        setRelatedIds(fetchedIds);
        setAllCards(cardElements);
        setVisibleCards(cardElements.slice(0, getCardCount(ref.current.offsetWidth)));
      } else {
        setVisibleCards(allCards.slice(0, getCardCount(ref.current.offsetWidth)));
      }
    } catch (err) {
      console.error('Error getting item details: ', err);
    }
  }

  const getCardCount = (w) => {
    // Left and right margins of card list is 20px each
    // Each card is 200px wide with right-margin of 10px
    return Math.floor((w - 40) / 210);
  }
  const updateCardsBasedOnWidth = () => {
    if(allCards) {
      let newCardCount = getCardCount(ref.current.offsetWidth);
      setVisibleCards(allCards.slice(indexOfFirstVisibleCard, indexOfFirstVisibleCard + newCardCount));
      setVisibleCardCount(newCardCount);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWidth(ref.current.offsetWidth);
      setVisibleCardCount(getCardCount(ref.current.offsetWidth));
    };
    setTimeout(handleResize, 500);
    fetchRelatedIds();
    setMainProductId(itemId);
    window.addEventListener('resize', handleResize);
    updateCardsBasedOnWidth();
    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, [width, itemId]);

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

export default Related