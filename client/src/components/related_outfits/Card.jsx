import React,{useState, useEffect} from 'react';
// import getItemDetails from '../../utils/getItemDetails.js';
import getCardData from '../../utils/getCardData.js';

const Card = ( {itemId} ) => {
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCardData(itemId);
        setCardData(data);
      } catch (err) {
        console.error('Error getting item details: ', err);
      }
    }
    fetchData();
  }, []);

  console.log("CARD STATE", cardData);

  return cardData ? (
    <div className="c card-container">
      <p>{itemId}</p>
      <p>{cardData.name}</p>
      <p>{cardData.category}</p>
      <p>{cardData.originalPrice}</p>
      <br/><img src={cardData.photos[0].thumbnail_url} />
    </div>
  ) : (
  <div className="c card-container">
    No Data
  </div>
  );
}
export default Card