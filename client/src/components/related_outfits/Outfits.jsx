import React,{useRef, useState, useEffect} from 'react';
import Carousel from './Carousel.jsx';

const Outfits = ( {itemId, updateMainProduct} ) => {
  // localStorage.clear();
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [outfitsByUser, setOutfitsByUser] = useState(null);
  const [isAdded, setIsAdded] = useState(null);

  const getOutfits = () => {
    return JSON.parse(localStorage.getItem(document.cookie)) || [];
  }

  useEffect(() => {
    const handleResize = () => {
      setWidth(ref.current.offsetWidth);
    };
    setTimeout(handleResize, 500);
    let parsedData = getOutfits();
    setOutfitsByUser(parsedData);
    (parsedData && parsedData.includes(itemId)) ? setIsAdded(parsedData.includes(itemId)) : setIsAdded(false);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, itemId]);

  const addProduct = () => {
    let parsedData = getOutfits();
    parsedData = [itemId, ...parsedData];
    localStorage.setItem(document.cookie, JSON.stringify(parsedData));
    console.log(parsedData);
    setOutfitsByUser(parsedData);
    setIsAdded(true);
  }

  const deleteProduct = (product_id) => {
    let parsedData = getOutfits();
    let updatedState = [];
    for (let id of parsedData) {
      if(id !== product_id) {
        updatedState.push(id);
      }
    }
    console.log(parsedData, updatedState);
    localStorage.removeItem(document.cookie);
    localStorage.setItem(document.cookie, JSON.stringify(updatedState));
    setIsAdded(updatedState.includes(itemId));
    setOutfitsByUser(updatedState);
  }
  const addCard = (
    <div className="c-card">
      <button type="button" className="c-card-action-add" onClick={() => addProduct()}>+</button>
    </div>
  );
  return outfitsByUser ? (
    <div className="c-outfits-container" ref={ref}>
      <Carousel className="c-outfits-carousel" itemId={itemId} ids={outfitsByUser} pWidth={width} deleteProduct={deleteProduct} action="outfits" updateMainProduct={updateMainProduct} addCard={addCard} isAdded={isAdded} />
    </div>
  ) : (
    <div className="c-outfits-container" ref={ref}>No Outfits</div>
  );
}

export default Outfits;