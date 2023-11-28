import React, { useRef, useState, useEffect } from 'react';
import Card from './Card.jsx';
import Carousel from './Carousel.jsx';
import fetchCardData from '../../utils/fetchCardData.js';

const Outfits = ({ itemId, updateMainProduct }) => {
  // localStorage.clear();
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [mainCard, setMainCard] = useState(null);
  const [isAdded, setIsAdded] = useState(null);
  const [outfitIds, setOutfitIds] = useState(null);
  const [outfitObj, setOutfitObj] = useState(null);
  const [outfitEl, setOutfitEl] = useState(null);

  const getLocalStorage = () => JSON.parse(localStorage.getItem(document.cookie)) || [];
  const postLocalStorage = (newOutfits) => {
    console.log("Pre", getLocalStorage());
    localStorage.removeItem(document.cookie);
    localStorage.setItem(document.cookie, JSON.stringify(newOutfits));
    console.log("Post", getLocalStorage());
  };

  const addProduct = () => {
    const updatedStorage = [itemId, ...outfitIds];
    postLocalStorage(updatedStorage);
    console.log("element", [mainCard, ...outfitEl]);
    setOutfitEl([mainCard, ...outfitEl]);
    setOutfitIds(updatedStorage);
    console.log("obj", [[itemId, mainCard], ...outfitObj]);
    setOutfitObj([[itemId, mainCard], ...outfitObj]);
    setIsAdded(true);
  };

  const deleteProduct = (productId) => {
    const updatedOutfitIds = [];
    const updatedOutfitObj = [];
    const updatedOutfitEl = [];

    console.log("1.Pre", outfitObj);
    outfitObj.forEach((outfit) => {
      console.log("curr", outfit[0], "to remove", productId);
      if (outfit[0] !== productId) {
        updatedOutfitIds.push(outfit[0]);
        updatedOutfitEl.push(outfit[1]);
        updatedOutfitObj.push([outfit]);
      }
    });
    console.log("1.Post", outfitObj);
    setOutfitEl(updatedOutfitEl);
    setOutfitIds(updatedOutfitIds);
    setOutfitObj(updatedOutfitObj);
    postLocalStorage(updatedOutfitIds);
    if (productId === itemId) {
      setIsAdded(false);
    }
  };

  const setAllCardData = async () => {
    try {
      const currentIds = outfitIds || getLocalStorage();
      const currentEl = [];
      const cards = await Promise.all(currentIds.map((id) => fetchCardData(id)));
      const cardObj = cards.map((card) => {
        const temp = (<Card className="c-card" cardDetails={card} cardKey={card.id + itemId} key={card.id} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} />);
        currentEl.push(temp);
        return [card.id, temp];
      });
      setOutfitEl(currentEl);
      setOutfitIds(currentIds);
      setOutfitObj(cardObj);
    } catch (err) {
      console.error('Error getting item details: ', err);
    }
  };

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

  const addCard = (
    <div className="c-card">
      <button type="button" className="c-card-action-add" onClick={() => addProduct()}>+</button>
    </div>
  );
  // cards={outfitObj.map((el) => el[1])}

  return outfitObj ? (
    <div className="c-outfits-container" ref={ref}>
      <Carousel className="c-outfits-carousel" itemId={itemId} cards={outfitEl} pWidth={width} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} addCard={addCard} isAdded={isAdded} />
    </div>
  ) : (
    <div className="c-outfits-container" ref={ref}>No Outfits</div>
  );
};

export default Outfits;
