import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';

const Outfits = ({ itemId, updateMainProduct }) => {
  // localStorage.clear();

  const [outfitsByUser, setOutfitsByUser] = useState(null);
  const [isAdded, setIsAdded] = useState(null);

  const getOutfits = () => JSON.parse(localStorage.getItem(document.cookie)) || [];

  useEffect(() => {
    const parsedData = getOutfits();
    setOutfitsByUser(parsedData);
    (parsedData && parsedData.includes(itemId)) ? setIsAdded(parsedData.includes(itemId)) : setIsAdded(false);
  }, [itemId]);

  const addProduct = () => {
    let parsedData = getOutfits();
    parsedData = [itemId, ...parsedData];
    localStorage.setItem(document.cookie, JSON.stringify(parsedData));
    setOutfitsByUser(parsedData);
    setIsAdded(true);
  };

  const deleteProduct = (product_id) => {
    const parsedData = getOutfits();
    const updatedState = [];
    for (const id of parsedData) {
      if (id !== product_id) {
        updatedState.push(id);
      }
    }
    localStorage.removeItem(document.cookie);
    localStorage.setItem(document.cookie, JSON.stringify(updatedState));
    setIsAdded(updatedState.includes(itemId));
    setOutfitsByUser(updatedState);
  };

  const nextClickHandler = () => {
    console.log('Next clicked');
  };

  return (
    <div className="c-outfits-container">
      {!isAdded ? (
        <div className="c-card-container">
          <button className="c-card-action-add" onClick={() => addProduct()}>+</button>
        </div>
      ) : null}
      {outfitsByUser ? outfitsByUser.map((id, index) => (<Card className={`c-card-container c-card-${index}`} itemId={id} key={id} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} />)) : null}
      <button onClick={nextClickHandler}>{'>'}</button>
    </div>
  );
};

export default Outfits;
