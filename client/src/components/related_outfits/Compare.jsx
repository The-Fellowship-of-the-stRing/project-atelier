import React,{useState, useEffect} from 'react';

const Compare = ( {itemId, compareName, featureData} ) => {
  let featureList = [];
  if(featureData){
    for (let key in featureData) {
      featureList.push([<div className="c-current-value">{featureData[key].current || ""}</div>,
      <div className="c-feature-value">{key}</div>,
      <div className="c-compared-value">{featureData[key].compared || ""}</div>]
      )
    }

  }

  return (
    <div>
      <div className="c-current">{itemId}</div>
      <div className="c-feature">Feature List</div>
      <div className="c-compared">{compareName}</div>
      {featureList}
    </div>
    )
}
export default Compare