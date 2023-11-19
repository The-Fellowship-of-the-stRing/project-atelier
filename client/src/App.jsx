import React, {useState, useEffect} from "react";
import RatingsReviews from './containers/RatingsReviews';
import getFirstItem from './utils/getFirstItem.js';
import Stars from './components/stars/Stars.jsx'
import QuestionsAnswers from './containers/QuestionsAnswers';
import RelatedOutfits from './containers/RelatedOutfits';
import ProductDetails from './containers/ProductDetails.jsx';

import './styles.css'

const App = () =>{
  const [currentItemId, setCurrentItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = await getFirstItem();
        setCurrentItemId(item.id);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <div>
          {!currentItemId ? (
              <span className="main-loader"></span>
          ) : (
            <>
              <Stars itemId={currentItemId} />
              <ProductDetails itemId={currentItemId}/>
              <RatingsReviews itemId={currentItemId}/>
              <QuestionsAnswers itemId={currentItemId}/>
              <RelatedOutfits itemId={currentItemId} />
            </>
          )}
      </div>
  )
}

export default App