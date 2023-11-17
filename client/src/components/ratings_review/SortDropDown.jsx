import React, {useState} from 'react'

const SortDropDown = ({sort, handleSort}) => {
  return (
    <select value={sort} onChange={handleSort}>
      <option value="relevant">relevant</option>
      <option value="newest">newest</option>
      <option value="helpful">helpful</option>
    </select>
  )
}

export default SortDropDown