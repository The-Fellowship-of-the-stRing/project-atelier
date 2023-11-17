import React,{useState, useEffect} from 'react';
// import getItemDetails from '../../utils/getItemDetails.js';
import getCardData from '../../utils/getCardData.js';

const Card = ( {itemId} ) => {
  const [cardData, setCardData] = useState(null); //

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await getCardData(itemId);
        setCardData(response);
      } catch (err) {
        console.error('Error getting item details: ', err);
      }
    }
    fetchCardData();
  },[]);

  console.log("Card State", cardData);
  return cardData ? (
    <div className="c card-container">
      <div>{itemId}</div>
      <div>{cardData.name}</div>
      <div>{cardData.category}</div>
      <div>{cardData.originalPrice}</div>
      <div>{cardData.originalPrice}</div>
      <img src={cardData.photos[0].thumbnail_url} />
    </div>
  ) : (
    <div>NO CARD DATA</div>
  )
}
export default Card