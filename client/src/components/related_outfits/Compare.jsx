import React from 'react';
import '../../stylesheets/related_outfits/CompareModal.css';
import { IoMdCheckmark } from 'react-icons/io';

const Compare = ({
  itemName, compareName, itemFeatures, cardData, compareClickHandler,
}) => {
  const compareData = {};
  for (let i = 0; i < itemFeatures.length; i += 1) {
    const currentFeature = itemFeatures[i];
    compareData[currentFeature.feature] = { current: currentFeature.value };
  }
  for (let i = 0; i < cardData.features.length; i += 1) {
    const currentFeature = cardData.features[i];
    if (compareData[currentFeature.feature]) {
      compareData[currentFeature.feature].compared = currentFeature.value;
    } else {
      compareData[currentFeature.feature] = { compared: currentFeature.value };
    }
  }

  let featureList;
  if (compareData) {
    const features = Object.keys(compareData);
    featureList = features.map((feature) => {
      let currentValue = compareData[feature].current ? compareData[feature].current : '';
      let compareValue = compareData[feature].compared ? compareData[feature].compared : '';
      if (currentValue === compareValue && currentValue !== '') {
        currentValue = <IoMdCheckmark />;
        compareValue = <IoMdCheckmark />;
      }
      return (
        <tr key={feature} className="c-compare-feature-item" data-testid="feature">
          <td className="c-compare-value">{currentValue}</td>
          <td className="c-compare-feature-value">{feature.toUpperCase()}</td>
          <td className="c-compare-value">{compareValue}</td>
        </tr>
      );
    });
  }

  return (
    <div className="c-compare-modal" role="button" tabIndex="0" onKeyPress={() => compareClickHandler()} onClick={() => compareClickHandler()} data-testid="compare">
      <div className="c-overlay" />
      <table className="c-compare-modal-table">
        <thead className="c-compare-header">
          <tr>
            <th colSpan="3" className="c-compare-title">COMPARING</th>
          </tr>
          <tr>
            <th scope="col">{itemName}</th>
            <th scope="col" />
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
export default Compare;
