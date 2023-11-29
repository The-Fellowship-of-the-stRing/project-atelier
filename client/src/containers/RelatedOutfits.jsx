import React, { useRef, useState, useEffect } from 'react';
import Related from '../components/related_outfits/Related.jsx';
import Outfits from '../components/related_outfits/Outfits.jsx';
import '../stylesheets/related_outfits/relatedOutfits.css';
import '../utils/getFirstItem.js';
/*
RENDERING LOGIC UPDATES:
- If product is in outfits and is a related product, do not render id Related Products
*/
const RelatedOutfits = ({
  itemId, itemFeatures, itemName, updateMainProduct,
}) => {
  const ref = useRef(null);
  const [maxCardCount, setMaxCardCount] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      // Left and right margins of card list is 20px each
    // Each card is 200px wide with right-margin of 10px
      if (maxCardCount !== Math.floor((ref.current.offsetWidth - 40) / 210)) {
        setMaxCardCount(Math.floor((ref.current.offsetWidth - 40) / 210));
        console.log("1.", Math.floor((ref.current.offsetWidth - 40) / 210));
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
      <h3 className="c-related-title">Related Products</h3>
      <Related
        itemId={itemId}
        itemName={itemName}
        itemFeatures={itemFeatures}
        updateMainProduct={updateMainProduct}
        maxCardCount={maxCardCount}
      />
      <h3 className="c-outfit-title">My Outfit</h3>
      <Outfits itemId={itemId} updateMainProduct={updateMainProduct} maxCardCount={maxCardCount} />
    </div>
  ) : (
    <div className="c-related-outfits-main-container" ref={ref} data-testid="related-outfits" />
  );
};
export default RelatedOutfits;
