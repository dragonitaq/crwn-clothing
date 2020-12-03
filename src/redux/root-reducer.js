import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
/* This is the local storage on windows object. */
import storage from 'redux-persist/lib/storage';

/* This is the session storage on windows object. We're not going to use in this case. */
// import storageSession from 'redux-persist/lib/storage/session'

import userReducer from './user/user-reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
  // This tells which reducer we want to use. We want the root reducer.
  key: 'root',
  // This tells which storage to use. We use the local storage that we import earlier.
  storage,
  // This tells which reducer we want to persist. Because user is handle by Firebase, so we just want cart.
  whitelist: ['cart'],
};

/* Each sub reducer MUST return an object. */
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

// Then we pass in our config & root reducer to have it persisted in local storage. This return a persisted version of our root reducer.
export default persistReducer(persistConfig, rootReducer);
