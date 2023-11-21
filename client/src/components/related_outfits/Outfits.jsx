import React,{useState, useEffect} from 'react';
import Card from './Card.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';
/* How to persist data on client side */
// local storage keyword to
// fs system - create new text files which stores in system files

const Outfits = ( {itemId} ) => {
  // localStorage.clear();
  let parsedData = JSON.parse(localStorage.getItem(document.cookie)) || [];

  const [outfitsByUser, setOutfitsByUser] = useState(parsedData);
  const [isAdded, setIsAdded] = useState(parsedData && parsedData.includes(itemId));

  console.log("State ", outfitsByUser, isAdded);

  // useEffect(() => {
  //   parsedData ? setOutfitsByUser(parsedData) : (localStorage.setItem(document.cookie, '[]') && setOutfitsByUser([]));
  //   /* TESTING */
  //   // setOutfitsByUser([40345, 40346, 40351, 40350]);
  //   parsedData && parsedData.includes(itemId) ? setIsAdded(parsedData.includes(itemId)) : setIsAdded(false);
  // }, []);

  const addProduct = () => {
    let parsedData = JSON.parse(localStorage.getItem(document.cookie));
    console.log("parsedData", parsedData)
    parsedData ? parsedData.push(itemId) : parsedData = [itemId];
    localStorage.setItem(document.cookie, JSON.stringify(parsedData));
    setOutfitsByUser(parsedData);
    setIsAdded(true);
  }
  // add -> delete -> add
  const deleteProduct = (product_id) => {
    let parsedData = JSON.parse(localStorage.getItem(document.cookie));
    let updatedState = [];
    for (let id of parsedData) {
      console.log(id);
      if(id !== product_id) {
        updatedState.push(id);
      }
    }
    localStorage.removeItem(document.cookie);
    setIsAdded(updatedState.includes(itemId));
    console.log("DEL:", localStorage);
    setOutfitsByUser(updatedState);
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
      {outfitsByUser ? outfitsByUser.map((id,index) => (<Card className={`c-card-container c-card-${index}`} itemId={id} key={id} deleteProduct={deleteProduct} action="outfits"/>)) : null}
      <button onClick={nextClickHandler}>></button>
    </div>
  ) : (
    <div className="c-outfits-container">
      <h3>My Outfit</h3>
      {outfitsByUser ? outfitsByUser.map((id,index) => (<Card className={`c-card-container c-card-${index}`} itemId={id} key={id} deleteProduct={deleteProduct} action="outfits"/>)) : null}
      <button onClick={nextClickHandler}>></button>
    </div>
  )
}

export default Outfits