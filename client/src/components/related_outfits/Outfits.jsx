import React, { useRef, useState, useEffect } from 'react';
import Card from './Card.jsx';
import Carousel from './Carousel.jsx';
import fetchCardData from '../../utils/fetchCardData.js';

const Outfits = ({ itemId, updateMainProduct }) => {
  // localStorage.clear();
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [outfitIds, setOutfitIds] = useState(null);
  const [allCards, setAllCards] = useState(null);
  const [mainCard, setMainCard] = useState(null);
  const [isAdded, setIsAdded] = useState(null);

  // const getOutfits = () => JSON.parse(localStorage.getItem(document.cookie)) || [];
  const getLocalStorage = () => JSON.parse(localStorage.getItem(document.cookie)) || [];
  const postLocalStorage = (newOutfits) => {
    localStorage.removeItem(document.cookie);
    localStorage.setItem(document.cookie, JSON.stringify(newOutfits));
  };

  const addProduct = () => {
    // let parsedData = getOutfits();
    // parsedData = [itemId, ...parsedData];
    // localStorage.setItem(document.cookie, JSON.stringify(parsedData));
    const updatedOutfitIds = [itemId, ...outfitIds];
    postLocalStorage(updatedOutfitIds);
    setOutfitIds(updatedOutfitIds);
    setIsAdded(true);
    setAllCards({ ...mainCard, ...allCards });
    // const updatedCards =
    setAllCards();
  };
  const deleteProduct = (productId) => {
    // const parsedData = getLocalStorage();
    const updatedOutfitIds = outfitIds.filter((id) => id !== productId);
    postLocalStorage(updatedOutfitIds);
    setOutfitIds(updatedOutfitIds);
    if (productId === itemId) {
      setIsAdded(false);
    }
  };

  const addCard = (
    <div className="c-card">
      <button type="button" className="c-card-action-add" onClick={() => addProduct()}>+</button>
    </div>
  );

  const getAllCardData = async () => {
    try {
      const parsedData = getLocalStorage();
      setOutfitIds(parsedData);
      const cards = await Promise.all(parsedData.map((id) => fetchCardData(id)));

      const cardElement = {};
      cards.forEach((card) => {
        const cardId = card.id;
        const cardEl = (<Card className="c-card" cardDetails={card} cardKey={card.id + itemId} key={card.id} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} />);
        if (card.id === itemId) {
          const mainCard = {};
          mainCard[card.id] = cardEl;
          setMainCard(mainCard);
        }
        cardElement[cardId] = cardEl;
      });

      // const cardElement = cards.map((card) => {
      //   const cardId = card.id;
      //   const cardEl = (<Card className="c-card" cardDetails={card} cardKey={card.id + itemId} key={card.id} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} />);
      //   if (card.id === itemId) {
      //     setMainCard(cardEl);
      //   }
      //   const cardObj = {};
      //   cardObj[cardId] = cardEl;
      //   return cardObj;
      // });
      /* REFACTOR THIS LATER ALL TO ABOVE PROMISE ALL */
      const mainCardData = await fetchCardData(itemId);
      const mainCardEl = (<Card className="c-card" cardDetails={mainCardData} cardKey={mainCardData.id + itemId} key={mainCardData.id} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} />);
      console.log('1.', cardElement);
      setMainCard(mainCardEl);
      setAllCards(cardElement);
      setIsAdded(parsedData.includes(itemId));
    } catch (err) {
      console.error('Error getting item details: ', err);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(ref.current.offsetWidth);
    };
    setTimeout(handleResize, 500);
    getAllCardData();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, itemId]);

  return allCards ? (
    <div className="c-outfits-container" ref={ref}>
      <Carousel className="c-outfits-carousel" itemId={itemId} cards={Object.values(allCards)} pWidth={width} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} addCard={addCard} isAdded={isAdded} />
    </div>
  ) : (
    <div className="c-outfits-container" ref={ref}>No Outfits</div>
  );
};

export default Outfits;
