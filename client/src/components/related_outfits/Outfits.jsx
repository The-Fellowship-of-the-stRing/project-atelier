import React,{useState, useEffect} from 'react';
import Card from './Card.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';

const Outfits = ( {itemId} ) => {
  const [outfitsByUser, setOutfitsByUser] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  // localStorage.clear();

  let parsedData = JSON.parse(localStorage.getItem(document.cookie));
  console.log("1. ", outfitsByUser);
  console.log("State ", parsedData);

  useEffect(() => {
    if(parsedData) {
      setOutfitsByUser(parsedData);
    } else {
      localStorage.setItem(document.cookie, '[]');
      setOutfitsByUser([]);
    }
    // parsedData ? setOutfitsByUser(parsedData) : localStorage.setItem(document.cookie, '[]');
  }, []);


  const addProduct = () => {
    let parsedData = JSON.parse(localStorage.getItem(document.cookie));
    parsedData.push(itemId);
    localStorage.setItem(document.cookie, JSON.stringify(parsedData));
    setOutfitsByUser(parsedData);
    setIsAdded(true);
  }

  // const deleteProduct = () => {
    //   console.log(`Add product id: ${itemId} to outfits with user id: ${userId}`)
    //   setIsAdded();
    // }

      const nextClickHandler = () => {
        console.log('Next clicked');
      };

  return (
    <div className="c-outfits-container">
      <h3>My Outfit</h3>
      <div className="c-card-container" >
      <button className="c-card-action-add" onClick={() => addProduct()}>+</button>
    </div>
      {outfitsByUser ? outfitsByUser.map((id,index) => (<Card className={`c-card-container c-card-${index}`} itemId={id} key={id} action="outfits"/>)) : null}
      <button onClick={nextClickHandler}>></button>
    </div>
  )

  // return !isAdded ? (
  //   <div className="c-outfits-container">
  //     <h3>My Outfit</h3>
  //     <div className="c-card-container" >
  //     <button className="c-card-action-add" onClick={() => addProduct()}>+</button>
  //   </div>
  //     {outfitsByUser ? outfitsByUser.map((id,index) => (<Card className={`c-card-container c-card-${index}`} itemId={id} key={id} action="outfits"/>)) : null}
  //     <button onClick={nextClickHandler}>></button>
  //   </div>
  // ) : (
  //   <div className="c-outfits-container">
  //     <h3>My Outfit</h3>
  //     {outfitsByUser ? outfitsByUser.map((id,index) => (<Card className={`c-card-container c-card-${index}`} itemId={id} key={id} action="outfits"/>)) : null}
  //     <button onClick={nextClickHandler}>></button>
  //   </div>
  // )

}
/* How to persist data on client side */
// local storage keyword to
// fs system - create new text files which stores in system files

export default Outfits