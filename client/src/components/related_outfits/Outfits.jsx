import React,{useState, useEffect} from 'react';
import Card from './Card.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';

const Outfits = ( {itemId} ) => {
  const [outfitIds, setOutfitIds] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    setUserId(document.cookie);
  }, [userId, outfitIds]);

  const nextClickHandler = () => {
    console.log('Next clicked');

  };

  const actionClickHander = () => {
    /* ADD DATA TO CLIENT AND ENSURE DATA PERSISTS */
    console.log(`Add product id: ${itemId} to outfits with user id: ${userId}`)
    let updatedOutfitIds =  [itemId, ...outfitIds];
    setOutfitIds(updatedOutfitIds);
    setIsAdded(true);

  }

  return !isAdded ? (
    <div className="c-outfits-container">
      <h3>My Outfit</h3>
      <div className="c-card-container" >
      <button className="c-card-action-add" onClick={() => actionClickHander()}>+</button>
    </div>
      {/* <AddToOutfit itemId={itemId} actionClickHander={actionClickHander}/> */}
      {outfitIds.map((id,index) => (<Card className={`c-card-container c-card-${index}`} itemId={id} key={id} action="outfits"/>))}
      {/* {<Card itemId={relatedIds[1]} key={relatedIds[0]} />} */}
      <button onClick={nextClickHandler}>></button>
    </div>
  ) : (
    <div className="c-outfits-container">
    <h3>My Outfit</h3>
    {outfitIds.map((id,index) => (<Card className={`c-card-container c-card-${index}`} itemId={id} key={id} action="outfits"/>))}
    {/* {<Card itemId={relatedIds[1]} key={relatedIds[0]} />} */}
    <button onClick={nextClickHandler}>></button>
  </div>
  )

}
/* How to persist data on client side */
// local storage keyword to
// fs system - create new text files which stores in system files

export default Outfits