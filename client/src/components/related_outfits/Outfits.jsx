import React,{useState, useEffect} from 'react';
import Card from './Card.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';

const Outfits = ( {itemId} ) => {
  const [outfitsByUser, setOutfitsByUser] = useState(null);
  const [isAdded, setIsAdded] = useState(null);
  // localStorage.clear();

  let parsedData = JSON.parse(localStorage.getItem(document.cookie));
  console.log("1. ", outfitsByUser);
  console.log("State ", outfitsByUser, isAdded);

  useEffect(() => {
    parsedData ? setOutfitsByUser(parsedData) : (localStorage.setItem(document.cookie, '[]') && setOutfitsByUser([]));
    parsedData && parsedData.includes(itemId) ? setIsAdded(parsedData.includes(itemId)) : setIsAdded(false) ;
  }, []);


  const addProduct = () => {
    let parsedData = JSON.parse(localStorage.getItem(document.cookie));
    parsedData.push(itemId);
    localStorage.setItem(document.cookie, JSON.stringify(parsedData));
    setOutfitsByUser(parsedData);
    setIsAdded(true);
  }

  const deleteProduct = () => {
      setIsAdded();
    }

  const nextClickHandler = () => {
    console.log('Next clicked');
  };

  return !isAdded ? (
    <div className="c-outfits-container">
      <h3>My Outfit</h3>
      <div className="c-card-container" >
      <button className="c-card-action-add" onClick={() => addProduct()}>+</button>
      </div>
      {outfitsByUser ? outfitsByUser.map((id,index) => (<Card className={`c-card-container c-card-${index}`} itemId={id} key={id} action="outfits"/>)) : null}
      <button onClick={nextClickHandler}>></button>
    </div>
  ) : (
    <div className="c-outfits-container">
      <h3>My Outfit</h3>
      {outfitsByUser ? outfitsByUser.map((id,index) => (<Card className={`c-card-container c-card-${index}`} itemId={id} key={id} action="outfits"/>)) : null}
      <button onClick={nextClickHandler}>></button>
    </div>
  )
}
/* How to persist data on client side */
// local storage keyword to
// fs system - create new text files which stores in system files

export default Outfits