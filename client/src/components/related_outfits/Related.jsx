import React, {useState, useEffect}  from 'react';
import Card from './Card.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';

const Related = ( {itemId, itemFeatures, itemName, updateMainProduct} ) => {
  const [relatedIds, setRelatedIds] = useState(null);

  useEffect(() => {
    const fetchRelatedIds = async () => {
      try {
        const fetchedIds = await getRelatedItems(itemId);
        setRelatedIds(fetchedIds);
      } catch (err) {
        console.error('Error getting item details: ', err);
      }
    }
    fetchRelatedIds();
  }, [itemId]);

  const nextClickHandler = () => {
    console.log('Next button clicked');
  };

  return relatedIds ? (
    <div className="c-related-container">
      {relatedIds.map((id,index) => {
        return id ? (<Card className={`c-card-container c-card-${index}`} itemId={id} cardKey={id+itemId} key={id+itemId} itemName={itemName} itemFeatures={itemFeatures} action="related" updateMainProduct={updateMainProduct}/>) : null;
        }
        )}
      <button onClick={nextClickHandler}>></button>
    </div>
  ) : (
    <div>No Related Items</div>
  )
}

export default Related