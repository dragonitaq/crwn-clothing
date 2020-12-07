/* The reason we create this component is because many time when we are fetching data from server, it is async operation that needs to wait. Therefore, we set our shop collections items to null as initial value. Then when fetching shop data from server, we use this spinning animation to indicate the data is loading instead of leaving a blank page for user to wait which will create misunderstanding that our app is unresponsive. */

import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

/* This a HOC (Higher Order Component) which takes in a component and do some operation and return different components result depends on the operation outcome. */
const withSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerContainer>
        <SpinnerOverlay />
      </SpinnerContainer>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };

  return Spinner;
};

export default withSpinner;
