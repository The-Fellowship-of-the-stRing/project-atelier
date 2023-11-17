import React, {useState, useEffect}  from 'react';
import Card from './Card.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';

const Related = ( {itemId} ) => {
  const [relatedIds, setRelatedIds] = useState([]);

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
  }, [itemId]);
  console.log(relatedIds);

  return (
    <div className="c related-container">
      {relatedIds.map(id => (<Card itemId={id} key={id} />))}
    </div>
  )
}

export default Related