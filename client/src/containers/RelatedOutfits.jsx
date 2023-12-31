import React, { useRef, useState, useEffect } from 'react';
import Related from '../components/related_outfits/Related.jsx';
import Outfits from '../components/related_outfits/Outfits.jsx';
import '../stylesheets/related_outfits/relatedOutfits.css';

const RelatedOutfits = ({
  itemId, itemFeatures, updateMainProduct, topRef,
}) => {
  const ref = useRef(null);
  const [maxCardCount, setMaxCardCount] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      // Each card is 220px wide with total margin of 75px
      const tempCardCount = Math.floor((ref.current.offsetWidth - 75) / 220);
      if (maxCardCount !== tempCardCount) {
        setMaxCardCount(tempCardCount);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return maxCardCount ? (
    <div className="c-related-outfits-main-container" ref={ref} data-testid="related-outfits">
      <h3 className="c-related-title">RELATED PRODUCTS</h3>
      <Related
        itemId={itemId}
        itemFeatures={itemFeatures}
        updateMainProduct={updateMainProduct}
        maxCardCount={maxCardCount}
        topRef={topRef}
      />
      <h3 className="c-outfit-title">MY OUTFITS</h3>
      <Outfits
        itemId={itemId}
        updateMainProduct={updateMainProduct}
        maxCardCount={maxCardCount}
        topRef={topRef}
      />
    </div>
  ) : (
    <div className="c-related-outfits-main-container" ref={ref} data-testid="related-outfits" />
  );
};
export default RelatedOutfits;
