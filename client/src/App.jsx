import React, {useState, useEffect} from "react";
import RatingsReviews from './containers/RatingsReviews';
import getFirstItem from './utils/getFirstItem.js';
import getProductDataById from './utils/getProductDataById.js';
import Stars from './components/stars/Stars.jsx'
import QuestionsAnswers from './containers/QuestionsAnswers';
import RelatedOutfits from './containers/RelatedOutfits';
import ProductDetails from './containers/ProductDetails.jsx';

import './styles.css'

const App = () =>{
  const [currentItem, setCurrentItem] = useState(null);

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
    updateMainProduct(40345);
  }, []);

  return (
      <div>
          {!currentItem ? (
              <span className="main-loader"></span>
          ) : (
            <>
              <Stars itemId={currentItem.id} />
              <ProductDetails itemId={currentItem.id}/>
              <RatingsReviews itemId={currentItem.id} itemName={currentItem.name}/>
              <QuestionsAnswers itemId={currentItem.id} itemName={currentItem.name}/>
              <RelatedOutfits itemId={currentItem.id} itemFeatures={currentItem.features} updateMainProduct={updateMainProduct}/>
            </>
          )}
      </div>
  )
}

export default App