import React,{useLayoutEffect, useRef, useState, useEffect} from 'react';
import Card from './Card.jsx';
import Carousel from './Carousel.jsx';
import fetchCardData from '../../utils/fetchCardData.js';
import getRelatedItems from '../../utils/getRelatedItems.js';

const Outfits = ( {itemId, updateMainProduct} ) => {
  // localStorage.clear();
  const ref = useRef(null);
  const [outfitIdsByUser, setOutfitIdsByUser] = useState(null);
  const [width, setWidth] = useState(0);
  const [allCards, setAllCards] = useState(null);
  const [isAdded, setIsAdded] = useState(null);

  const getOutfits = () => {
    return JSON.parse(localStorage.getItem(document.cookie)) || [];
  }
  const getAllCardData = async () => {
    try {
      let parsedData = getOutfits();
      let cards = await Promise.all(parsedData.map((id,index) => fetchCardData(id)));
      let cardElement = cards.map((card,index) =>
        (<Card className={`c-card c-card-${index}`} cardDetails={card} cardKey={card.id+itemId} key={card.id+itemId+index} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct}/>));
      setOutfitIdsByUser(parsedData);
      setAllCards(cardElement);
      (parsedData && parsedData.includes(itemId)) ? setIsAdded(parsedData.includes(itemId)) : setIsAdded(false);

    } catch (err) {
      console.error('Error getting item details: ', err);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWidth(ref.current.offsetWidth);
    };
    setTimeout(handleResize, 500);
    getAllCardData();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [width, itemId]);

  const addProduct = () => {
    let parsedData = getOutfits();
    parsedData = [itemId, ...parsedData];
    localStorage.setItem(document.cookie, JSON.stringify(parsedData));
    setOutfitIdsByUser(parsedData);
    setIsAdded(true);
  }

  const deleteProduct = (product_id) => {
    let parsedData = getOutfits();
    let updatedState = [];
    for (let id of parsedData) {
      if(id !== product_id) {
        updatedState.push(id);
      }
    }
    localStorage.removeItem(document.cookie);
    localStorage.setItem(document.cookie, JSON.stringify(updatedState));
    setIsAdded(updatedState.includes(itemId));
    setOutfitIdsByUser(updatedState);
  }

  return allCards ? (
    <div className="c-outfits-container" ref={ref} >
        {!isAdded ? (
          <div className="c-card-container">
            <button className="c-card-action-add" onClick={() => addProduct()}>+</button>
          </div>
        ) : null}
        {(<Carousel className={"c-outfits-carousel"} itemId={itemId} cardIds={outfitIdsByUser} cards={allCards} pWidth={width} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct}/>)}
    </div>
  ) : (
    <div className="c-outfits-container" ref={ref}>No Outfits</div>
  )

}

export default Outfits