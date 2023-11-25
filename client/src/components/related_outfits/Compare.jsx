import React,{useState, useEffect} from 'react';
import '../../stylesheets/related_outfits/CompareModal.css'

const CompareModal = ( {itemId, cardKey, itemName, compareName, itemFeatures, cardData, compareClickHandler} ) => {

  let compareData = {};
  for (let i = 0; i < itemFeatures.length; i++) {
    let currentFeature = itemFeatures[i];
    compareData[currentFeature.feature] = {current:currentFeature.value};
  }
  for (let i = 0; i < cardData.features.length; i++) {
    let currentFeature = cardData.features[i];
    compareData[currentFeature.feature]
      ? compareData[currentFeature.feature].compared = currentFeature.value
      : compareData[currentFeature.feature] = {compared:currentFeature.value};
  }

  let featureList = [];
  if(compareData){
    let index = 0;
    for (let feature in compareData) {
      featureList.push(
        <div key={cardKey+index}>
          <div className="c-feature-value">{index + feature}</div>
          <div className="c-current-value">{compareData[feature].current ? compareData[feature].current : "n/a"}</div>
          <div className="c-compared-value">{compareData[feature].compared ? compareData[feature].compared : "n/a"}</div>
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