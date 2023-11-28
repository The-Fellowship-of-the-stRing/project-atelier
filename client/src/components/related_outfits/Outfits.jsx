import React, { useRef, useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';

const Outfits = ({ itemId, updateMainProduct }) => {
  localStorage.clear();
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [outfitsByUser, setOutfitsByUser] = useState(null);
  const [isAdded, setIsAdded] = useState(null);

  const getLocalStorage = () => JSON.parse(localStorage.getItem(document.cookie)) || [];
  const postLocalStorage = (newOutfits) => {
    localStorage.removeItem(document.cookie);
    localStorage.setItem(document.cookie, JSON.stringify(newOutfits));
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(ref.current.offsetWidth);
    };
    setTimeout(handleResize, 500);
    const parsedData = getLocalStorage();
    setOutfitsByUser(parsedData);
    setIsAdded(getLocalStorage().includes(itemId));
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, itemId]);

  const addProduct = () => {
    const parsedData = getLocalStorage();
    const updatedState = [itemId, ...parsedData];
    postLocalStorage(updatedState);
    setOutfitsByUser(updatedState);
    setIsAdded(true);
  };

  const deleteProduct = (productId) => {
    const parsedData = getLocalStorage();
    const updatedState = parsedData.filter((id) => id !== productId);
    postLocalStorage(updatedState);
    setIsAdded(updatedState.includes(itemId));
    setOutfitsByUser(updatedState);
  };
  const addCard = (
    <div className="c-card">
      <button type="button" className="c-card-action-add" onClick={() => addProduct()}>+</button>
    </div>
  );
  return outfitsByUser ? (
    <div className="c-outfits-container" ref={ref}>
      <Carousel
        className="c-outfits-carousel"
        itemId={itemId}
        ids={outfitsByUser}
        pWidth={width}
        deleteProduct={deleteProduct}
        action="outfits"
        updateMainProduct={updateMainProduct}
        addCard={addCard}
        isAdded={isAdded}
      />
    </div>
  ) : (
    <div className="c-outfits-container" ref={ref}>No Outfits</div>
  );
};

export default Outfits;
