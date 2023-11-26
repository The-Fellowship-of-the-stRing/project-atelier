import React, {useState, useEffect}  from 'react';
import Card from './Card.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';

const Related = ( {itemId, itemFeatures, itemName, updateMainProduct} ) => {
  const [relatedIds, setRelatedIds] = useState(null);
  const [allCards, setAllCards] = useState(null);
  const [visibleCards, setVisibleCards] = useState(null);
  const [indexOfFirstVisibleCard, setIndexOfFirstVisibleCard] = useState(0);
  useEffect(() => {
    const fetchRelatedIds = async () => {
      try {
        const fetchedIds = await getRelatedItems(itemId);
        setRelatedIds(fetchedIds);
        let cards = fetchedIds.map((id,index) => {
          return id ? (
            <Card className={`c-card c-card-${index}`} itemId={id} cardKey={id+itemId} key={id+itemId} itemName={itemName} itemFeatures={itemFeatures} action="related" updateMainProduct={updateMainProduct}/>
            ) : null;
          })
        setAllCards(cards);
        /* HARD CODING VISIBLE CARD COUNT TO 4 */
        /* WILL MAKE DYNAMICALLY ADJUST SIZE BASED ON WINDOW SIZE */
        let visibleCardsCount = 4;
        setVisibleCards(cards.slice(0,4));
      } catch (err) {
        console.error('Error getting item details: ', err);
      }
    }
    fetchRelatedIds();
  }, []);

  const nextClickHandler = () => {
    setVisibleCards([...visibleCards.slice(1), allCards[indexOfFirstVisibleCard+4]]);
    setIndexOfFirstVisibleCard(indexOfFirstVisibleCard + 1);
  };

  console.log(visibleCards);

  return relatedIds ? (
    <div className="c-related-container">
      <div className="c-cards">
        {/* {relatedIds.map((id,index) => {
          return id ? (
            <Card className={`c-card c-card-${index}`} itemId={id} cardKey={id+itemId} key={id+itemId} itemName={itemName} itemFeatures={itemFeatures} action="related" updateMainProduct={updateMainProduct}/>
            ) : null;
          })
        } */}
        {visibleCards}
      </div>
      <p className="c-next"onClick={nextClickHandler}>></p>
    </div>
  ) : (
    <div>No Related Items</div>
  )
}

export default Related