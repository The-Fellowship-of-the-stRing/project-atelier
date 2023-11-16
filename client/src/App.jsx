import React, {useState, useEffect} from "react";
import RatingsReviews from './containers/RatingsReviews';
import getFirstItem from './utils/getFirstItem.js';

const App = () =>{
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = await getFirstItem();
        setCurrentItem(item);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <h1>
          Welcome to React App thats build using Webpack and Babel separately! Great Job team!
          {!currentItem ? (
              <p>Loading Item...</p>
          ) : (
            <>
              <RatingsReviews item={currentItem}/>
            </>
          )}
      </h1>
  )
}

export default App