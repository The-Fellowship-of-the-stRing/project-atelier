import React, { useRef, useState, useEffect } from 'react';
import Card from './Card.jsx';
import Carousel from './Carousel.jsx';
import fetchCardData from '../../utils/fetchCardData.js';

const Outfits = ({ itemId, updateMainProduct }) => {
  // localStorage.clear();
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  // const [outfitIds, setOutfitIds] = useState(null);
  const [allCards, setAllCards] = useState(null);
  const [mainCard, setMainCard] = useState(null);
  const [isAdded, setIsAdded] = useState(null);

  const getLocalStorage = () => JSON.parse(localStorage.getItem(document.cookie)) || [];
  console.log("allCards", allCards);
  const postLocalStorage = (newOutfits) => {
    localStorage.removeItem(document.cookie);
    localStorage.setItem(document.cookie, JSON.stringify(newOutfits));
  };

  const addProduct = () => {
    // const updatedOutfits = { ...mainCard, ...allCards };
    const updatedOutfits = [mainCard, ...allCards];
    postLocalStorage(updatedOutfits);
    setIsAdded(true);
    setAllCards(updatedOutfits);
  };
  const deleteProduct = (productId) => {
    const currentOutfits = getLocalStorage();
    const updatedOutfitIds = currentOutfits.filter((id) => id !== productId);
    postLocalStorage(updatedOutfitIds);
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
      const parsedData = Object.keys(getLocalStorage());
      const cards = await Promise.all(parsedData.map((id) => fetchCardData(Number(id))));
      // const cardElement = {};
      // cards.forEach((card) => {
      //   const cardEl = (<Card className="c-card" cardDetails={card} cardKey={card.id + itemId} key={card.id} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} />);
      //   cardElement[card.id] = cardEl;
      // });

      const cardElement = cards.map((card) => {
        const cardEl = (<Card className="c-card" cardDetails={card} cardKey={card.id + itemId} key={card.id} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} />);
        const cardObj = {};
        cardObj[card.id] = cardEl;
        return cardObj;
      });

      /* REFACTOR THIS LATER ALL TO ABOVE PROMISE ALL */
      const mainCardData = await fetchCardData(itemId);
      const mainCardEl = (<Card className="c-card" cardDetails={mainCardData} cardKey={mainCardData.id + itemId} key={mainCardData.id} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} />);
      const mainCardObj = {};
      mainCardObj[itemId] = mainCardEl;
      setMainCard(mainCardObj);
      setAllCards(cardElement);
      setIsAdded(Object.keys(cardElement).includes(String(itemId)));
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
      <Carousel className="c-outfits-carousel" itemId={itemId} cards={allCards.map((card) => Object.values(card))} pWidth={width} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} addCard={addCard} isAdded={isAdded} />
    </div>
  ) : (
    <div className="c-outfits-container" ref={ref}>No Outfits</div>
  );
};

export default Outfits;
