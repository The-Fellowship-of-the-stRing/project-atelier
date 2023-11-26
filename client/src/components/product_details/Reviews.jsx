import Stars from '../stars/Stars.jsx'
import React,{useState,useEffect} from 'react';
import getReviewMeta from '../../utils/getReviewMeta.js';
import '../../stylesheets/product_details/reviews.css';
const Reviews = ({itemId, handleRef}) => {
  const [reviewCount, setReviewCount] = useState(null);
  useEffect(()=> {
    const fetchCount = async () => {
      const data = await getReviewMeta(itemId);
      let count = 0;
      for(var x in data.ratings) {
        count = count + parseInt(data.ratings[x]);
      }
      setReviewCount(count);
    }
   fetchCount();
  },[])
  return reviewCount>0? (
    <div className="g-reviews">
      <Stars itemId ={itemId}/>
      <a id="g-review-scroll" onClick={handleRef} >{reviewCount} reviews</a>
    </div>
  ):
  <div>
  </div>
}
export default Reviews