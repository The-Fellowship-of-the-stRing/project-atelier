import React, {useState} from 'react'

import '../../stylesheets/ratings_review/sortDropDown.css'

const SortDropDown = ({sort, handleSort}) => {
  return (
    <select defaultValue={sort} onChange={handleSort} className="l-sort-drop-down-list">
      <option value="relevance">relevance</option>
      <option value="newest">newest</option>
      <option value="helpful">helpful</option>
    </select>
  )
}

export default SortDropDown