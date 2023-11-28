import React, { useRef, useState, useEffect } from 'react';
import Card from './Card.jsx';
import Carousel from './Carousel.jsx';
import fetchCardData from '../../utils/fetchCardData.js';

const Outfits = ({ itemId, updateMainProduct }) => {
  // localStorage.clear();
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [outfitIds, setOutfitIds] = useState(null);
  const [mainCard, setMainCard] = useState(null);
  const [isAdded, setIsAdded] = useState(null);
  const [outfitObj, setOutfitObj] = useState(null);


  const getLocalStorage = () => JSON.parse(localStorage.getItem(document.cookie)) || [];
  const postLocalStorage = (newOutfits) => {
    localStorage.removeItem(document.cookie);
    localStorage.setItem(document.cookie, JSON.stringify(newOutfits));
  };

  const addProduct = () => {
    postLocalStorage([itemId, ...outfitIds]);
    setOutfitObj([[itemId, mainCard], ...outfitObj]);
    setOutfitIds([itemId, ...outfitIds]);
    setIsAdded(true);
  };

  const deleteProduct = (productId) => {
    const updatedOutfitIds = outfitIds.filter((id) => id !== productId);
    postLocalStorage(updatedOutfitIds);
    if (productId === itemId) {
      setIsAdded(false);
    }
    setOutfitIds(updatedOutfitIds);
  };
  const setAllCardData = async () => {
    try {
      const currentIds = outfitIds || getLocalStorage();
      setOutfitIds(currentIds);
      const cards = await Promise.all(currentIds.map((id) => fetchCardData(id)));
      const cardEl = cards.map((card) => {
        const temp = (<Card className="c-card" cardDetails={card} cardKey={card.id + itemId} key={card.id} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} />);
        return [card.id, temp];
      });
      setOutfitObj(cardEl);
    } catch (err) {
      console.error('Error getting item details: ', err);
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

  useEffect(() => {
    const handleResize = () => {
      setWidth(ref.current.offsetWidth);
    };
    setTimeout(handleResize, 500);
    getMainCard();
    setAllCardData();
    setIsAdded(getLocalStorage().includes(itemId));
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, itemId]);

  return outfitObj ? (
    <div className="c-outfits-container" ref={ref}>
      <Carousel className="c-outfits-carousel" itemId={itemId} cards={outfitObj.map((el) => el[1])} pWidth={width} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} addCard={addCard} isAdded={isAdded} />
    </div>
  ) : (
    <div className="c-outfits-container" ref={ref}>No Outfits</div>
  );
};

export default Outfits;
