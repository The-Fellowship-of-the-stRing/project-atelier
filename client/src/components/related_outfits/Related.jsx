import React, { useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';

const Related = ({
  itemId, itemFeatures, updateMainProduct, maxCardCount, topRef,
}) => {
  const [relatedIds, setRelatedIds] = useState(null);

  const fetchRelatedIds = async () => {
    try {
      const fetchedIds = await getRelatedItems(itemId);
      setRelatedIds(fetchedIds);
    } catch (err) {
      console.error('Error getting item details: ', err);
    }
  };

  useEffect(() => {
    fetchRelatedIds();
  }, [itemId]);

  return relatedIds ? (
    <div className="c-related-container" data-testid="related">
      <Carousel
        className="c-outfits-carousel"
        itemId={itemId}
        ids={relatedIds}
        maxCardCount={maxCardCount}
        action="related"
        itemFeatures={itemFeatures}
        updateMainProduct={updateMainProduct}
        topRef={topRef}
      />
    </div>
  ) : (
    <div>No Related Items</div>
  );
};

export default Related;
