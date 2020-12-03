import { combineReducers } from 'redux';

import userReducer from './user/user-reducer';
import cartReducer from './cart/cart.reducer';

/* Each sub reducer MUST return an object. */
export default combineReducers({
  user: userReducer,
  cart: cartReducer,
});
