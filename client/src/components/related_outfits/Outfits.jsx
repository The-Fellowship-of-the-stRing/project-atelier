import React, { useRef, useState, useEffect } from 'react';
import Card from './Card.jsx';
import Carousel from './Carousel.jsx';
import fetchCardData from '../../utils/fetchCardData.js';

const Outfits = ({ itemId, updateMainProduct }) => {
  // localStorage.clear();
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [cardElements, setCardElements] = useState(null);
  const [mainCard, setMainCard] = useState(null);
  const [isAdded, setIsAdded] = useState(null);
  /*
  Inital render:
  - get mainCard
  - getlocalStorage
  */
  const getLocalStorage = () => JSON.parse(localStorage.getItem(document.cookie)) || [];
  // const getIdsFromLocalStorage = () => {
  //   const currentStorage = getLocalStorage();
  //   return currentStorage === [] ? [] : currentStorage.map((card) => Object.keys(card)[0]);
  // };
  // const getElementsFromLocalStorage = () => {
  //   const currentStorage = getLocalStorage();
  //   const hi = currentStorage === [] ? [] : currentStorage.map((card) => Object.values(card)[0]);
  //   return hi;
  // };
  const postLocalStorage = (newOutfits) => {
    localStorage.removeItem(document.cookie);
    localStorage.setItem(document.cookie, JSON.stringify(newOutfits));
  };

  const addProduct = () => {
    const curr = getLocalStorage(); // [{itemId1: <Card1>}, {itemId2: <Card2>}]
    postLocalStorage([itemId, ...curr]);
    console.log("1", getLocalStorage());
    setCardElements([mainCard, ...cardElements]);
    setIsAdded(true);
  };

  const deleteProduct = (productId) => {
    const currentOutfits = getLocalStorage();
    const updatedOutfitIds = currentOutfits.filter((card) => {
      return Number(Object.keys(card)[0]) !== productId;
    });
    postLocalStorage(updatedOutfitIds);
    // const temp = getElementsFromLocalStorage();
    // setCardElements(temp);
    // setAllCards(updatedOutfitIds);
    if (productId === itemId) {
      setIsAdded(false);
    }
  };

  const addCard = (
    <div className="c-card">
      <button type="button" className="c-card-action-add" onClick={() => addProduct()}>+</button>
    </div>
  );
  const getMainCard = async () => {
    try {
      const mainCardData = await fetchCardData(itemId);
      const mainCardEl = (<Card className="c-card" cardDetails={mainCardData} cardKey={mainCardData.id + itemId} key={mainCardData.id} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} />);
      setMainCard(mainCardEl);
    } catch (err) {
      console.error('Error getting item details: ', err);
    }
  };

  const setAllCardData = async () => {
    try {
      const currentIds = getLocalStorage();
      const cards = await Promise.all(currentIds.map((id) => fetchCardData(id)));
      const cardEl = cards.map((card) => (<Card className="c-card" cardDetails={card} cardKey={card.id + itemId} key={card.id} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} />));
      console.log("1.", cardEl);
      setCardElements(cardEl);
    } catch (err) {
      console.error('Error getting item details: ', err);
    }
  };

  // const getAllCardData = async () => {
  //   try {
  //     const currentOutfits = getIdsFromLocalStorage();
  //     if (!allCards) {
  //       const cards = await Promise.all(currentOutfits.map((id) => fetchCardData(Number(id))));
  //       const cardElement = cards.map((card) => {
  //         const cardObj = {};
  //         const cardEl = (<Card className="c-card" cardDetails={card} cardKey={card.id + itemId} key={card.id} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} />);
  //         cardObj[card.id] = cardEl;
  //         return cardObj;
  //       });
  //       setAllCards(cardElement);
  //     }

  //     /* REFACTOR THIS LATER ALL TO ABOVE PROMISE ALL */
  //     const mainCardData = await fetchCardData(itemId);
  //     const mainCardEl = (<Card className="c-card" cardDetails={mainCardData} cardKey={mainCardData.id + itemId} key={mainCardData.id} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} />);
  //     const mainCardObj = {};
  //     mainCardObj[itemId] = mainCardEl;
  //     setMainCard(mainCardObj);
  //     setIsAdded(currentOutfits.includes(itemId));
  //   } catch (err) {
  //     console.error('Error getting item details: ', err);
  //   }
  // };

  useEffect(() => {
    const handleResize = () => {
      setWidth(ref.current.offsetWidth);
    };
    setTimeout(handleResize, 500);
    const currentIds = getLocalStorage();
    getMainCard(); // mainCard = <Card>
    // const currentEl = getElementsFromLocalStorage(); // [<Card 1>, <Card 2>, ...]
    // const currentId = getIdsFromLocalStorage();// [itemId1, itemId2, ...]
    const currentElements = setAllCardData();
    setIsAdded(currentIds.includes(itemId));
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, itemId]);

  // console.log('1. All Card', allCards);

  return cardElements ? (
    <div className="c-outfits-container" ref={ref}>
      <Carousel className="c-outfits-carousel" itemId={itemId} cards={cardElements} pWidth={width} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} addCard={addCard} isAdded={isAdded} />
    </div>
  ) : (
    <div className="c-outfits-container" ref={ref}>No Outfits</div>
  );
};

export default Outfits;
