import React, {useState, useEffect}  from 'react';
import Card from './Card.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';
import getProductDataById from '../../utils/getProductDataById.js';
import getStyleDataById from '../../utils/getStyleDataById.js';

const Related = ( {itemId, itemFeatures, itemName, updateMainProduct} ) => {
  const [relatedIds, setRelatedIds] = useState(null);
  const [allCards, setAllCards] = useState(null);
  const [visibleCards, setVisibleCards] = useState(null);
  const [visibleCardCount, setVisibleCardCount] = useState(null)
  const [indexOfFirstVisibleCard, setIndexOfFirstVisibleCard] = useState(0);
  const [isNextShown, setIsNextShown] = useState(true);

  const fetchCardData = async (id) => {
    try {
      const productData = await getProductDataById(id);
      const styleData = await getStyleDataById(id);
      // if(productData&&styleData) {}
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


  useEffect(() => {
    const fetchRelatedIds = async () => {
      try {
        const fetchedIds = await getRelatedItems(itemId);
        let cards = await Promise.all(fetchedIds.map((id,index) => fetchCardData(id)));
        let cardElements = cards.map((card, index) =>
          <Card className={`c-card c-card-${index}`} cardDetails={card} cardKey={card.id+itemId} key={card.id+itemId} itemName={itemName} itemFeatures={itemFeatures} action="related" updateMainProduct={updateMainProduct}/>);
        setRelatedIds(fetchedIds);
        setAllCards(cardElements);

        /* WILL MAKE DYNAMICALLY ADJUST COUNT BASED ON WINDOW WIDTH */
        let visibleCards = 4;
        setVisibleCardCount(visibleCards);
        setVisibleCards(cardElements.slice(0,visibleCards));
      } catch (err) {
        console.error('Error getting item details: ', err);
      }
    }
    fetchRelatedIds();
  }, []);

  const nextClickHandler = () => {
    let updatedIndex = indexOfFirstVisibleCard + 1;
    setVisibleCards([...visibleCards.slice(1), allCards[indexOfFirstVisibleCard+visibleCardCount]]);
    setIndexOfFirstVisibleCard(updatedIndex);
    /* Remove next button if there are no more cards */
    (updatedIndex + visibleCardCount === allCards.length) && setIsNextShown(false);
  };

  return visibleCards ? (
    <div className="c-related-container">
      <div className="c-cards">
        {visibleCards}
      </div>
      {isNextShown && <p className="c-next"onClick={nextClickHandler}>></p>}
    </div>
  ) : (
    <div>No Related Items</div>
  )
}

export default Related