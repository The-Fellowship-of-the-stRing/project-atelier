import React, {useLayoutEffect, useRef, useState, useEffect}  from 'react';
import Card from './Card.jsx';
import Carousel from './Carousel.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';
import fetchCardData from '../../utils/fetchCardData.js';
import getProductDataById from '../../utils/getProductDataById.js';
import getStyleDataById from '../../utils/getStyleDataById.js';

const Related = ( {itemId, itemFeatures, itemName, updateMainProduct} ) => {
  const ref = useRef(null);
  const [mainProductId, setMainProductId] = useState(null);
  const [width, setWidth] = useState(0);
  const [relatedIds, setRelatedIds] = useState(null);
  const [allCards, setAllCards] = useState(null);

  const fetchRelatedIds = async () => {
    try {
      if (itemId !== mainProductId) {
        setMainProductId(itemId);
        const fetchedIds = await getRelatedItems(itemId);
        let cards = await Promise.all(fetchedIds.map((id,index) => fetchCardData(id)));
        let cardElements = cards.map((card, index) =>
          <Card className={`c-card c-card-${index}`} cardDetails={card} cardKey={card.id+itemId} key={card.id+itemId+index} itemName={itemName} itemFeatures={itemFeatures} action="related" updateMainProduct={updateMainProduct}/>);
        setRelatedIds(fetchedIds);
        setAllCards(cardElements);

      } else if (!allCards) {
        setMainProductId(itemId);
        const fetchedIds = await getRelatedItems(itemId);
        let cards = await Promise.all(fetchedIds.map((id,index) => fetchCardData(id)));
        let cardElements = cards.map((card, index) =>
          <Card className={`c-card c-card-${index}`} cardDetails={card} cardKey={card.id+itemId} key={card.id+itemId+index} itemName={itemName} itemFeatures={itemFeatures} action="related" updateMainProduct={updateMainProduct}/>);
        setRelatedIds(fetchedIds);
        setAllCards(cardElements);

      }
    } catch (err) {
      console.error('Error getting item details: ', err);
    }
  }


  useEffect(() => {
    const handleResize = () => {
      setWidth(ref.current.offsetWidth);
    };
    setTimeout(handleResize, 500);
    fetchRelatedIds();
    setMainProductId(itemId);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, [width, itemId]);


  return allCards ? (
    <div className="c-related-container" ref={ref}>
      <div className="c-cards" >
        <Carousel cards={allCards} pWidth={width} itemFeatures={itemFeatures} updateMainProduct={updateMainProduct}/>
      </div>
    </div>
  ) : (
    <div ref={ref}>No Related Items</div>
  )
}

export default Related