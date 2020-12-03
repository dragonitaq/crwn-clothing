import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

import './index.css';

ReactDOM.render(
  /* Putting Provider (higher order component) as the parent above all components provide access to all Redux features. In here, we pass in our store. */
  <Provider store={store}>
    {/* BrowserRouter is a component that provide routing functionality.*/}
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
