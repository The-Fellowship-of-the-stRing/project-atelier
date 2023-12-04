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
const Footer = React.lazy(() => import('./containers/Footer'));

const App = () => {
  const [currentItem, setCurrentItem] = useState(null);
  const [siteOffer, setSiteOffer] = useState(null);
  const reviewRef = useRef(null);
  const topRef = useRef(null);

  const updateMainProduct = async (itemId) => {
    try {
      const storage = await getProductDataById(itemId);
      setCurrentItem(storage);
      if (!siteOffer) {
        setSiteOffer(storage);
      }
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  useEffect(() => {
    const id = 40351;
    updateMainProduct(id);
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
            itemFeatures={currentItem.features}
            updateMainProduct={updateMainProduct}
            topRef={topRef}
          />
          <QuestionsAnswers itemId={currentItem.id} itemName={currentItem.name} />
          <RatingsReviews
            itemId={currentItem.id}
            itemName={currentItem.name}
            ref={reviewRef}
          />
          <Footer topRef={topRef} />
        </Suspense>
      )}
    </div>
  );
};

export default App;
