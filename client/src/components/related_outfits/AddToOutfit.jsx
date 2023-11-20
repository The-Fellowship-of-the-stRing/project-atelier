import React,{useState, useEffect} from 'react';

const AddToOutfit = ( {itemId} ) => {
  const [isAdded, setIsAdded] = useState(false);

  const actionClickHander = (itemId) => {
    /* ADD DATA TO CLIENT AND ENSURE DATA PERSISTS */
    setIsAdded(true);
  }

  return !isAdded ? (
    <div className="c-card-container" >
      <button className="c-card-action-add" onClick={() => actionClickHander()}>+</button>
    </div>
  ) : (
  <div className="c-card-container">
    ALREADY ADDED PRODUCT TO OUTFITS
  </div>
  );
}
export default AddToOutfit