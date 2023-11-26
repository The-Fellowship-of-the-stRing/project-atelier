import React, {useState, useEffect}  from 'react';
import Card from './Card.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';
import getProductDataById from '../../utils/getProductDataById.js';
import getStyleDataById from '../../utils/getStyleDataById.js';

const Related = ( {itemId, itemFeatures, itemName, updateMainProduct} ) => {
  const [relatedIds, setRelatedIds] = useState(null);
  const [allCards, setAllCards] = useState(null);
  const [visibleCards, setVisibleCards] = useState(null);
  const [indexOfFirstVisibleCard, setIndexOfFirstVisibleCard] = useState(0);

  const fetchCardData = async (id) => {
    try {
      const productData = await getProductDataById(id);
      const styleData = await getStyleDataById(id);
      if(productData&&styleData) {
        let response = {
          id: id,
          name: productData.name || "NO NAME",
          category: productData.category || "NO CAT",
          features: productData.features || []
        };
        /* USE DEFAULT STYLE || FIRST STYLE */
        for (let i = 0; i < styleData.length; i++) {
          let style = styleData[i];
          if (i === 0 || style["default?"]) {
            response.photos = style.photos[0].thumbnail_url || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
            response.original_price = style.original_price;
            response.sale_price = style.sale_price;
          }
        }
        // console.log('FETCH CARD DATA', response);
        return response;
      }
    } catch (err) {
      console.error('Error getting item details: ', err);
    }
  }


  useEffect(() => {
    const fetchRelatedIds = async () => {
      try {
        const fetchedIds = await getRelatedItems(itemId);
        setRelatedIds(fetchedIds);
        let cards = await Promise.all(fetchedIds.map((id,index) => {
          // let cardDetails = fetchCardData(id);
          // return <Card className={`c-card c-card-${index}`} itemId={id} cardDetails={cardDetails} cardKey={id+itemId} key={id+itemId} itemName={itemName} itemFeatures={itemFeatures} action="related" updateMainProduct={updateMainProduct}/>

          return fetchCardData(id);
          // return id ? (
          //   <Card className={`c-card c-card-${index}`} itemId={id} cardKey={id+itemId} key={id+itemId} itemName={itemName} itemFeatures={itemFeatures} action="related" updateMainProduct={updateMainProduct}/>
          //   ) : null;
          }))

        let cardElements = cards.map((card, index) => <Card className={`c-card c-card-${index}`} cardDetails={card} key={card.id+itemId} itemName={itemName} itemFeatures={itemFeatures} action="related" updateMainProduct={updateMainProduct}/>);

        console.log("1.", cardElements);
        setAllCards(cardElements);
        /* HARD CODING VISIBLE CARD COUNT TO 4 */
        /* WILL MAKE DYNAMICALLY ADJUST SIZE BASED ON WINDOW SIZE */
        let visibleCardsCount = 4;
        setVisibleCards(cardElements.slice(0,4));
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

  return visibleCards ? (
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