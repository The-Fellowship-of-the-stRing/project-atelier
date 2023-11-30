import React from 'react';
import Style from './Style.jsx';

const StyleGallery = ({ styles, handleStyle }) => ((
  styles.map((value, index) => (
    <Style
      key={value.style_id}
      thumbnail={value.photos[0].thumbnail_url}
      handleStyle={handleStyle}
      index={index}
    />
  ))));

export default StyleGallery;
