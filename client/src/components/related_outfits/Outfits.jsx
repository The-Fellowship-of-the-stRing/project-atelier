import React,{useState, useEffect} from 'react';
import Card from './Card.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';

const Outfits = ( {itemId} ) => {
  const [outfitIds, setOutfitIds] = useState([]);

  useEffect(() => {
    const fetchOutfitIds = async () => {
      try {
        const fetchedIds = await getRelatedItems(itemId);
        setOutfitIds(fetchedIds);
      } catch (err) {
        console.error('Error getting item details: ', err);
      }
    }
    fetchOutfitIds();
  }, []);

  return outfitIds ? (
    <div className="c-outfits-container">
      <h3>My Outfit</h3>
      {outfitIds.map((id,index) => (<Card className={`c-card-container c-card-${index}`} itemId={id} key={id} />))}
      {/* {<Card itemId={relatedIds[1]} key={relatedIds[0]} />} */}
    </div>
  ) : (
    <div>No Outfits Items</div>
  )

  return (
    <div className="c-outfits-container">
    </div>
  )
}

export default Outfits