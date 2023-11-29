import React, { useRef, useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';
import getRelatedItems from '../../utils/getRelatedItems.js';

const Related = ({
  itemId, itemFeatures, itemName, updateMainProduct,
}) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
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
    const handleResize = () => {
      setWidth(ref.current.offsetWidth);
    };
    setTimeout(handleResize, 500);
    fetchRelatedIds();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, itemId]);

  return relatedIds && itemId ? (
    <div className="c-related-container" ref={ref} data-testid="related">
      <Carousel
        className="c-outfits-carousel"
        pWidth={width}
        itemId={itemId}
        ids={relatedIds}
        itemName={itemName}
        action="related"
        itemFeatures={itemFeatures}
        updateMainProduct={updateMainProduct}
      />
    </div>
  ) : (
    <div ref={ref}>No Related Items</div>
  );
};

export default Related;
