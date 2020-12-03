import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartHidden } from '../../redux/cart/cart-actions';
import { selectCartItemsCount } from '../../redux/cart/cart-selector';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

/* Every time any state change, Redux will call all mapStateToProp on EVERY component that is connected to it; even that component is only connected to its slice of the state like user & cart. Because even slight change on the state will cause a return of an entire brand new object.
However, Redux connect() actually does a shallow comparison for us as so if the value of our props being passed into our component from mapStateToProps has not changed, it won't pass anything new to our component which won't cause it to needlessly re-render.
What reselect does is it allows us to memoize complex calculations in our selectors, meaning that if we were trying to pass a prop into our component that needs some complex logic using different values on our redux state, unless those input values change it won't recompute the value. Re-watch lesson 125 to understand better. */
const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
