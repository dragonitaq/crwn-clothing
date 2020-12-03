import { createSelector } from 'reselect';

/* There are 2 types of selector:
1) Input Selector -> Doesn't use createSelector()
2) Output Selector -> Use input selector s createSelector() */

// This is Input Selector
const selectCart = (state) => state.cart;

//These are Output Selector
export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems);

export const selectCartHidden = createSelector([selectCart], (cart) => cart.hidden);

/* It is the return value from selectCartItems that get memoized, which is cartItems. Only when cartItems changes, then the function will run. */
export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0));

export const selectCartTotal = createSelector([selectCartItems], (cartItems) => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price, 0));
