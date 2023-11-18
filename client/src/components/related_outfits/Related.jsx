import React, {useState, useEffect}  from 'react';
import Card from './Card.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';

const Related = ( {itemId} ) => {
  const [relatedIds, setRelatedIds] = useState(null);

  useEffect(() => {
    const fetchRelatedIds = async () => {
      try {
        const fetchedIds = await getRelatedItems(itemId)
        setRelatedIds(fetchedIds);
      } catch (err) {
        console.error('Error getting item details: ', err);
      }
    }
    fetchRelatedIds();
  }, []);

  return relatedIds ? (
    <div className="c related-container">
      {relatedIds.map((id,index) => (<Card className={`card-container card-${index}`} itemId={id} key={id} />))}
      {/* {<Card itemId={relatedIds[1]} key={relatedIds[0]} />} */}
    </div>
  ) : (
    <div>No Related Items</div>
  )
}

export default Related