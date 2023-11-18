import React, {useState, useEffect} from "react";
import RatingsReviews from './containers/RatingsReviews';
import getFirstItem from './utils/getFirstItem.js';
import Stars from './components/stars/Stars.jsx'
import QuestionsAnswers from './containers/QuestionsAnswers';
import RelatedOutfits from './containers/RelatedOutfits';

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
          Welcome to React App thats build using Webpack and Babel separately! Great Job team!
          {!currentItemId ? (
              <p>Loading Item...</p>
          ) : (
            <>
              <Stars itemId={currentItemId} />
              <RatingsReviews itemId={currentItemId}/>
              <QuestionsAnswers itemId={currentItemId}/>
              <RelatedOutfits itemId={currentItemId} />
            </>
          )}
      </div>
  )
}

export default App