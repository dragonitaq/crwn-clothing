import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

/* Redux middle is expecting an array if you we multiple middlewares according to its documentation. */
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

/* We create Redux store by using createStore() and pass in our rootReducer (which is a returned object). And then we pass in all middlewares by spreading in every item (value, object or fn) from middleware array as individual params.  */
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

/* Persistor is the persistent version of our store. */
export const persistor = persistStore(store);

/* We export persistedStore just in case we are going to use it in future. */
const persistedStore = { store, persistor };

export default persistedStore;
