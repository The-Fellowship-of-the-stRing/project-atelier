import React,{useState, useEffect} from 'react';
import Card from './Card.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';
/* How to persist data on client side */
// local storage keyword to
// fs system - create new text files which stores in system files

const Outfits = ( {itemId, fetchData} ) => {
  // localStorage.clear();

  let parsedData = JSON.parse(localStorage.getItem(document.cookie)) || [];
  const [outfitsByUser, setOutfitsByUser] = useState(null);
  const [isAdded, setIsAdded] = useState(null);

  useEffect(() => {
    parsedData ? setOutfitsByUser(JSON.parse(localStorage.getItem(document.cookie))) : (localStorage.setItem(document.cookie, '[]') && setOutfitsByUser([]));
    /* TESTING */
    // setOutfitsByUser([40345, 40346, 40351, 40350]);
    parsedData && parsedData.includes(itemId) ? setIsAdded(parsedData.includes(itemId)) : setIsAdded(false);
  }, [itemId]);

  // let parsedData = JSON.parse(localStorage.getItem(document.cookie)) || [];
  // const [outfitsByUser, setOutfitsByUser] = useState(parsedData);
  // const [isAdded, setIsAdded] = useState(parsedData && parsedData.includes(itemId));

  const addProduct = () => {
    let parsedData = JSON.parse(localStorage.getItem(document.cookie));
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
      if(id !== product_id) {
        updatedState.push(id);
      }
    }
    localStorage.removeItem(document.cookie);
    setIsAdded(updatedState.includes(itemId));
    setOutfitsByUser(updatedState);
  }

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
      {outfitsByUser ? outfitsByUser.map((id,index) => (<Card className={`c-card-container c-card-${index}`} itemId={id} key={id} deleteProduct={deleteProduct} action="outfits" fetchData={fetchData}/>)) : null}
      <button onClick={nextClickHandler}>></button>
    </div>
  )
}

export default Outfits