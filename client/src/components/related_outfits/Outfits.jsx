import React, { useRef, useState, useEffect } from 'react';
import Card from './Card.jsx';
import Carousel from './Carousel.jsx';
import fetchCardData from '../../utils/fetchCardData.js';

const Outfits = ({ itemId, updateMainProduct }) => {
  localStorage.clear();
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [allCards, setAllCards] = useState(null);
  const [mainCard, setMainCard] = useState(null);
  const [isAdded, setIsAdded] = useState(null);

  const getOutfits = () => JSON.parse(localStorage.getItem(document.cookie)) || [];

  const addProduct = () => {
    let parsedData = getOutfits();
    parsedData = [itemId, ...parsedData];
    localStorage.setItem(document.cookie, JSON.stringify(parsedData));
    setIsAdded(true);
    setAllCards([mainCard, ...allCards]);
  };
  const deleteProduct = (productId) => {
    console.log('Deleted Id', productId, allCards[0]);
    const parsedData = getOutfits();
    const updatedState = parsedData.filter((id) => id !== productId);
    localStorage.removeItem(document.cookie);
    localStorage.setItem(document.cookie, JSON.stringify(updatedState));

    setIsAdded(!(productId === itemId));
    // setIsAdded(updatedState.includes(itemId));
  };

  const addCard = (
    <div className="c-card">
      <button type="button" className="c-card-action-add" onClick={() => addProduct()}>+</button>
    </div>
  );

  const getAllCardData = async () => {
    try {
      const parsedData = getOutfits();
      const cards = await Promise.all(parsedData.map((id) => fetchCardData(id)));
      const cardElement = cards.map((card) => {
        const cardEl = (<Card className="c-card" cardDetails={card} cardKey={card.id + itemId} key={card.id} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} />);
        if (card.id === itemId) {
          setMainCard(cardEl);
        }
        return cardEl;
      });
      /* REFACTOR THIS LATER ALL TO ABOVE PROMISE ALL */
      const mainCardData = await fetchCardData(itemId);
      const mainCardEl = (<Card className="c-card" cardDetails={mainCardData} cardKey={mainCardData.id + itemId} key={mainCardData.id} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} />);
      setMainCard(mainCardEl);

      setAllCards(cardElement);
      if (parsedData) {
        setIsAdded(parsedData.includes(itemId));
      }
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
      {/* {!isAdded ? (
        <div className="c-card">
          <button type="button" className="c-card-action-add" onClick={() => addProduct()}>+</button>
        </div>
      ) : null} */}
      <Carousel className="c-outfits-carousel" itemId={itemId} cards={allCards} pWidth={width} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} addCard={addCard} isAdded={isAdded} />
    </div>
  ) : (
    <div className="c-outfits-container" ref={ref}>No Outfits</div>
  );
};

export default Outfits;
