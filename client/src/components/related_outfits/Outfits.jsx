import React, { useState, useEffect } from 'react';
import { VscDiffAdded } from 'react-icons/vsc';
import Carousel from './Carousel.jsx';

const Outfits = ({
  itemId, updateMainProduct, maxCardCount, topRef,
}) => {
  const [outfitsByUser, setOutfitsByUser] = useState(null);
  const [isAdded, setIsAdded] = useState(null);

  const getLocalStorage = () => JSON.parse(localStorage.getItem(document.cookie)) || [];
  const postLocalStorage = (newOutfits) => {
    localStorage.removeItem(document.cookie);
    localStorage.setItem(document.cookie, JSON.stringify(newOutfits));
  };

  useEffect(() => {
    const parsedData = getLocalStorage();
    setOutfitsByUser(parsedData);
    setIsAdded(parsedData.includes(itemId));
  }, [itemId]);

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
    <div
      className="c-card"
      data-testid="add-card"
      role="button"
      tabIndex="0"
      onKeyPress={() => addProduct()}
      onClick={() => addProduct()}
      aria-label="add card"
    >
      <VscDiffAdded className="c-card-action-add" />
    </div>
  );
  return outfitsByUser && isAdded !== null ? (
    <div className="c-outfits-container" data-testid="outfits">
      <Carousel
        className="c-outfits-carousel"
        itemId={itemId}
        ids={outfitsByUser}
        maxCardCount={maxCardCount}
        deleteProduct={deleteProduct}
        action="outfits"
        updateMainProduct={updateMainProduct}
        addCard={addCard}
        isAdded={isAdded}
        topRef={topRef}
      />
    </div>
  ) : (
    <div>No Outfits</div>
  );
};

export default Outfits;
