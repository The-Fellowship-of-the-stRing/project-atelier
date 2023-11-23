import React,{useState, useEffect} from 'react';

const CompareModal = ( {itemName, compareName, itemFeatures, cardData} ) => {

  let compareData = {};
  for (let i = 0; i < itemFeatures.length; i++) {
    let currentFeature = itemFeatures[i];
    compareData[currentFeature.feature] = {current:currentFeature.value};
  }
  for (let i = 0; i < cardData.features.length; i++) {
    let currentFeature = cardData.features[i];
    compareData[currentFeature.feature].compared = currentFeature.value;
  }

  let featureList = [];
  if(compareData){
    let index = 0;
    for (let key in compareData) {
      featureList.push(
      <div className="c-compare-feature" key={index}>
        <div className="c-current-value">{compareData[key].current ? compareData[key].current : ""}</div>
        <div className="c-feature-value">{key}</div>
        <div className="c-compared-value">{compareData[key].compared ? compareData[key].compared : ""}</div>
      </div>
      )
      index++;
    }
  }

  return (
    <div>
      <div className="c-compare-header">
        <div className="c-current">{itemName}</div>
        <div className="c-feature">Feature List</div>
        <div className="c-compared">{compareName}</div>
      </div>
      {featureList}
    </div>
    )
}
export default CompareModal