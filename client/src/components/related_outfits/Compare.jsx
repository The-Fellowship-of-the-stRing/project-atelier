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
        <tr key={cardKey+index}>
          <th scope="row">{feature}</th>
          <td>{compareData[feature].current ? compareData[feature].current : ""}</td>
          <td>{compareData[feature].compared ? compareData[feature].compared : ""}</td>
        </tr>
      )
      index++;
    }
  }

  return (
    <div className="c-compare-modal" onClick={() => compareClickHandler()}>
      <div className="c-overlay"></div>
      <table className="c-compare-model-content">
        <thead className="c-compare-header">
          <tr>
            <th scope="col">Feature</th>
            <th scope="col">{itemName}</th>
            <th scope="col">{compareName}</th>
          </tr>
        </thead>
        <tbody>
          {featureList}
        </tbody>
      </table>

    </div>
    )
}
export default CompareModal