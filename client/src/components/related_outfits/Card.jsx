import React,{useState, useEffect} from 'react';
// import getItemDetails from '../../utils/getItemDetails.js';
import getCardData from '../../utils/getCardData.js';

const Card = ( {itemId, className} ) => {
  const [cardData, setCardData] = useState(null);
  console.log(itemId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCardData(itemId);
        console.log("CARD STATE", data);
        return setCardData(data);
      } catch (err) {
        console.error('Error getting item details: ', err);
      }
    }
    fetchData();
  }, []);


  return cardData ? (
    <div className={className}>
      <img className="card-img" src={cardData.photos ? cardData.photos[0].thumbnail_url : ""} />
      <p className="card-cat">{cardData.category}</p>
      <p className="card-name">{cardData.name}</p>
      <p className="card-price">{`${cardData.sales_price ||'Not on sale'} - $${cardData.original_price}`}</p>
      <p className="card-star">STAR RATING</p>
    </div>
  ) : (
  <div className="c card-container">
    No Data
  </div>
  );
}
export default Card