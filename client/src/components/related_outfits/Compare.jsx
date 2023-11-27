import React from 'react';
import '../../stylesheets/related_outfits/CompareModal.css';

const CompareModal = ({
  cardKey, itemName, compareName, itemFeatures, cardData, compareClickHandler,
}) => {
  const compareData = {};
  for (let i = 0; i < itemFeatures.length; i++) {
    const currentFeature = itemFeatures[i];
    compareData[currentFeature.feature] = { current: currentFeature.value };
  }
  for (let i = 0; i < cardData.features.length; i++) {
    const currentFeature = cardData.features[i];
    compareData[currentFeature.feature]
      ? compareData[currentFeature.feature].compared = currentFeature.value
      : compareData[currentFeature.feature] = { compared: currentFeature.value };
  }

  const featureList = [];
  if (compareData) {
    let index = 0;
    for (const feature in compareData) {
      featureList.push(
        <tr key={cardKey + index} className="c-compare-feature-item">
          <td>{feature.toUpperCase()}</td>
          <td>{compareData[feature].current ? compareData[feature].current : ''}</td>
          <td>{compareData[feature].compared ? compareData[feature].compared : ''}</td>
        </tr>,
      );
      index++;
    }
  }

  return (
    <div className="c-compare-modal" onClick={() => compareClickHandler()}>
      <div className="c-overlay" />
      <table className="c-compare-modal-table">
        <thead className="c-compare-header">
          <tr>
            <th scope="col">Feature</th>
            <th scope="col">{itemName}</th>
            <th scope="col">{compareName}</th>
          </tr>
        </thead>
        <tbody className="c-compare-body">
          {featureList}
        </tbody>
      </table>
    </div>
  );
};
export default CompareModal;
