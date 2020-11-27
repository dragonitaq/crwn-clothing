import React from 'react';

import './form-input.styles.scss';

/* This is our custom made form using this functional component. */
const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className='group'>
    <input className='form-input' onChange={handleChange} {...otherProps} />
      {/* Whenever user type anything in, it means value.length >0, then return className of shrink which will animate the CSS effect. Otherwise, nothing. The form-input-label is the default class for styling purpose.
      The reason we do a logic IF check because we allow developer the freedom to whether pass in label. */}
    {label ? (
      <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
    ) : null}
  </div>
);

export default FormInput;
