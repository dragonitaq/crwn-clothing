import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import './index.css';

ReactDOM.render(
  /* Putting Provider (higher order component) as the parent above all components provide access to all Redux features. In here, we pass in our store. */
  <Provider store={store}>
    {/* BrowserRouter is a component that provide routing functionality.*/}
    <BrowserRouter>
      {/* PersistGate will receive Redux store and also 'rehydrate'(refill) the state whenever app refresh/reopen. */}
      <PersistGate persistor={persistor}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
