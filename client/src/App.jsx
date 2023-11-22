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

  const fetchData = async (itemId) => {
    try {
      /* LAST VERSION - WILL REMOVE ONCE APPROVED */
      // const item = await getFirstItem();
      // setCurrentItem(item);

      const item = await getProductDataById(itemId);
      setCurrentItem(item);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };
  console.log(currentItem);

  useEffect(() => {
    /* NOTE: Hardcoding initial item and using product/:id endpoint as it is needed in Outfits Components */
    fetchData(40351);
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
              <QuestionsAnswers itemId={currentItem.id}/>
              <RelatedOutfits itemId={currentItem.id} itemFeatures={currentItem.features} fetchData={fetchData}/>
            </>
          )}
      </div>
  )
}

export default App