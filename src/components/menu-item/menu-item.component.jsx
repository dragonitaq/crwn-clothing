import React from 'react';
import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size }) => (
  <div
    /* The size has value 'large' or null. If there is a value large, then this element will get style with the class of 'large' in CSS that we predefined earlier. */
    className={`${size} menu-item`}
  >
    <div
      className='background-image'
      /* We can use CSS style in React code. Notice we use camel case instead of the convention kebab case. This way, we can dynamically insert value directly into CSS property. */
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
);

export default MenuItem;
