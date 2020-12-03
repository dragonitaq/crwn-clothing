import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

/* Redux middle is expecting an array if you we multiple middlewares according to its documentation. */
const middlewares = [logger];

/* We create Redux store by using createStore() and pass in our rootReducer (which is a returned object). And then we pass in all middlewares by spreading in every item (value, object or fn) from middlewares array as individual params.  */
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
