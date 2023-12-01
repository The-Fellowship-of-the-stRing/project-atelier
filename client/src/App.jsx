import React, {
  useState, useEffect, useRef, Suspense,
} from 'react';
import { GoDash } from 'react-icons/go';
import ProductDetails from './containers/ProductDetails.jsx';
import getProductDataById from './utils/getProductDataById.js';

import './styles.css';

const NavBar = React.lazy(() => import('./containers/NavBar'));
const RatingsReviews = React.lazy(() => import('./containers/RatingsReviews'));
const QuestionsAnswers = React.lazy(() => import('./containers/QuestionsAnswers'));
const RelatedOutfits = React.lazy(() => import('./containers/RelatedOutfits'));

const App = () => {
  const [currentItem, setCurrentItem] = useState(null);
  const [siteOffer, setSiteOffer] = useState(null);
  const reviewRef = useRef(null);
  const topRef = useRef(null);

  const updateMainProduct = async (itemId) => {
    try {
      const item = await getProductDataById(itemId);
      setCurrentItem(item);
      if (!siteOffer) {
        setSiteOffer(item);
      }
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
    updateMainProduct(40351);
  }, []);

  return (
    <div className="app-main-container" ref={topRef}>
      {!currentItem ? (
        <span className="main-loader" />
      ) : (
        <Suspense fallback={<span className="main-loader" />}>
          <NavBar topRef={topRef} />
          <div className="app-site-offer-header">
            <span className="app-site-offer-start">SIDE-WIDE ANNOUNCEMENT MESSAGE!</span>
            {' '}
            <GoDash />
            {' '}
            SALE / DISCOUNT
            {' '}
            <b>OFFER</b>
            {' '}
            <GoDash />
            {' '}
            <span
              role="button"
              tabIndex="0"
              onKeyDown={() => updateMainProduct(siteOffer.id)}
              onClick={() => updateMainProduct(siteOffer.id)}
              className="app-site-offer-link"
              aria-label="product highlight"
            >
              {siteOffer.name}
            </span>
          </div>
          <ProductDetails itemId={currentItem.id} reviewRef={reviewRef} />
          <RelatedOutfits
            itemId={currentItem.id}
            itemName={currentItem.name}
            itemFeatures={currentItem.features}
            updateMainProduct={updateMainProduct}
          />
          <QuestionsAnswers itemId={currentItem.id} itemName={currentItem.name} />
          <RatingsReviews
            itemId={currentItem.id}
            itemName={currentItem.name}
            ref={reviewRef}
          />
        </Suspense>
      )}
    </div>
  );
};

export default App;
