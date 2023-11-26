import React from 'react';
import Style from './Style.jsx';

const StyleGallery = (props) => (
  props.styles.map((value, index) => <Style key={value.style_id} thumbnail={value.photos[0].thumbnail_url} handleStyle={props.handleStyle} index={index} />)
);

export default StyleGallery;
