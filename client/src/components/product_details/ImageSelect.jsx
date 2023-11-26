import React from 'react';
import Image from './Image.jsx';

const ImageSelect = ({ style }) => (
  style.photos.map((value) => (
    <Image key={value.thumbnail_url} thumbnail={value.thumbnail_url} />
  ))
);
export default ImageSelect;
