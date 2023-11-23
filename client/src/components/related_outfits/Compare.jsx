import React,{useState, useEffect} from 'react';
import '../../stylesheets/related_outfits/CompareModal.css'

const CompareModal = ( {itemId, cardKey, itemName, compareName, itemFeatures, cardData, compareClickHandler} ) => {

  let compareData = {};
  for (let i = 0; i < itemFeatures.length; i++) {
    let currentFeature = itemFeatures[i];
    let featureValue = currentFeature.value ? currentFeature.value : '';
    compareData[currentFeature.feature] = {current:featureValue};
  }
  for (let i = 0; i < cardData.features.length; i++) {
    let currentFeature = cardData.features[i];
    let featureValue = currentFeature.value ? currentFeature.value : '';
    compareData[currentFeature.feature]
      ? compareData[currentFeature.feature].compared = featureValue
      : compareData[currentFeature.feature] = {compared:featureValue};
  }

  let featureList = [];
  if(compareData){
    let index = 0;
    for (let key in compareData) {
      featureList.push(
        <div key={cardKey+index}>
          <div className="c-feature-value">{key}</div>
          <div className="c-current-value">{compareData[key].current ? compareData[key].current : ""}</div>
          <div className="c-compared-value">{compareData[key].compared ? compareData[key].compared : ""}</div>
        </div>
      )
      index++;
    }
  }

  return (
    <div className="c-compare-modal" onClick={() => compareClickHandler()}>
      <div className="c-overlay"></div>
      <div className="c-compare-model-content">
        <div className="c-feature">Feature</div>
        <div className="c-current">{itemName}</div>
        <div className="c-compared">{compareName}</div>
        {featureList}
      </div>
    </div>
    )
}
export default CompareModal