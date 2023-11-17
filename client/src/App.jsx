import React, {useState, useEffect} from "react";
import RatingsReviews from './containers/RatingsReviews';
import getFirstItem from './utils/getFirstItem.js';
import Stars from './components/stars/Stars.jsx'
import QuestionsAnswers from './containers/QuestionsAnswers';
import RelatedOutfits from './containers/RelatedOutfits';
import ProductDetails from './containers/ProductDetails'

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
      <h1>
          Welcome to React App thats build using Webpack and Babel separately! Great Job team!
          {!currentItemId ? (
              <p>Loading Item...</p>
          ) : (
            <>
              <Stars itemId={currentItemId} />
              <ProductDetails.jsx itemId={currentItemId}/>
              <RatingsReviews itemId={currentItemId}/>
              <QuestionsAnswers itemId={currentItemId}/>
              <RelatedOutfits itemId={currentItemId} />
            </>
          )}
      </h1>
  )
}

export default App