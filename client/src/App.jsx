import React, {
  useState, useEffect, useRef, Suspense,
} from 'react';
import ProductDetails from './containers/ProductDetails.jsx';
import getProductDataById from './utils/getProductDataById.js';

import './styles.css';

const RatingsReviews = React.lazy(() => import('./containers/RatingsReviews'));
const QuestionsAnswers = React.lazy(() => import('./containers/QuestionsAnswers'));
const RelatedOutfits = React.lazy(() => import('./containers/RelatedOutfits'));

const App = () => {
  const [currentItem, setCurrentItem] = useState(null);
  const reviewRef = useRef(null);

  const handleRef = () => {
    reviewRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateMainProduct = async (itemId) => {
    try {
      const item = await getProductDataById(itemId);
      setCurrentItem(item);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  useEffect(() => {
    /* NOTE: Hardcoding first item */
    /* TEST CASES
    40349 - [Related] Getting duplicate keys for cards
    40345 - Has default style, but no images
    40352 - No default style
    */
    updateMainProduct(40344);
  }, []);

  return (
    <div>
      {!currentItem ? (
        <span className="main-loader" />
      ) : (
        <Suspense fallback={<span className="main-loader" />}>
          <ProductDetails itemId={currentItem.id} handleRef={handleRef} />
          <RelatedOutfits
            itemId={currentItem.id}
            itemName={currentItem.name}
            itemFeatures={currentItem.features}
            updateMainProduct={updateMainProduct}
          />
          <QuestionsAnswers itemId={currentItem.id} itemName={currentItem.name} />
          <RatingsReviews itemId={currentItem.id} itemName={currentItem.name} ref={reviewRef} />
        </Suspense>
      )}
    </div>
  );
};

export default App;
