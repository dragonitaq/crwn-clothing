import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div
    /* The size has value 'large' or null. If there is a value large, then this element will get style with the class of 'large' in CSS that we predefined earlier. */
    className={`${size} menu-item`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
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

/* withRouter will transform a given component into a upgraded version with accessibility to router props like history, match & location. */
export default withRouter(MenuItem);
