import React from 'react';
import HomePage from './pages/homepage.component';
import { Route } from 'react-router-dom';

import './App.css';
import './pages/homepage.styles.scss';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

function App() {
  return (
    <div>
      {/* We we use switch, when one route is executing, it ends immediately without routing other routes. */}
      <switch>
        {/* exact default to true which means the URL must be exactly the stated. */}
        <Route exact path='/' component={HomePage} />
        <Route exact path='/hats' component={HatsPage} />
      </switch>
    </div>
  );
}

export default App;
