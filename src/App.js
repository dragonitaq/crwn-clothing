import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndOutPage from './pages/sign-in-and-out/sign-in-and-up.component';

import './App.css';
import './pages/homepage/homepage.styles.scss';

function App() {
  return (
    <div>
      {/* By placing here outside of the <Switch>, we render this component for every pages. */}
      <Header />
      {/* We we use switch, when one route is executing, it ends immediately without routing other routes. */}
      <Switch>
        {/* exact default to true which means the URL must be exactly the stated. */}
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/signin' component={SignInAndOutPage} />
      </Switch>
    </div>
  );
}

export default App;
