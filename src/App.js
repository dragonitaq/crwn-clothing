import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndOutPage from './pages/sign-in-and-out/sign-in-and-up.component';
import { auth, createUserProfileDoc } from './firebase/firebase.utils';

import './App.css';
import './pages/homepage/homepage.styles.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }
  /* In ES6 Class syntax, you are writing a function (the constructor) and the associated prototype object (everything outside the constructor) at the same time. When you write methods that go into that prototype object (the part outside the constructor), you don't need to declare with var/const/let. */
  unsubscribeFromAuth = null;

  /* Once the page is mounted, we then check if there is user authenticated. All previous authenticated users will be recorded in browser session as well for our app (follow domain name) so user can easily sign in back. */
  componentDidMount() {
    /* auth.onAuthStateChanged() initiates OPEN SUBSCRIPTION between Firebase server and client side.
    unsubscribeFromAuth is reassigned to the return value of calling auth.onAuthStateChanged(). This method returns another method: firebase.unsubscribe() which can then be used to terminate subscription. */
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // Check if there is a signed user
      if (userAuth) {
        // Get doc reference and create new user profile doc if it doesn't exist.
        const userRef = await createUserProfileDoc(userAuth);

        /* Get snapshot from query. This is similar to "userRef.get()", instead this method receive a cb. We then use the returned snapshot data to set our currentUser state.
        More importantly, this initiates another OPEN SUBSCRIPTION which need to call the return fn to unsubscribe in the componentWillUnmount lifecycle. I don't know why we don't do so here. */
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
          console.log(this.state);
        });
      } else {
        // If there is no signed user, userAuth will be null.
        this.setState({ currentUser: userAuth }, () => {
          console.log(this.state);
        });
      }
    });
  }

  /* OPEN SUBSCRIPTION is like an opening messaging system that the channel is kept alive between server & client side. This make our app always listen to Firebase message. Thus, whenever any changes occur on Firebase user's states from any source related to our web app, Firebase will send out message that tell the auth state has changed. So developer no need to manually check every time for user's auth states. It is like an IM that Firebase will msg our web app that something has changed.
  Before components unmount, we need to execute this fn which has firebase.unsubscribe() in it. The reason is because Firebase auth is an open subscription, we need to close the session to prevent information leak. */
  componentWillUnmount() {
    this.unsubscribeFromAuth();
    /* REVIEW We indeed need to unsubscribe from our snapshot as stated in Firebase documentation. Whatever reason, we didn't do it in this app. */
  }

  render() {
    return (
      <div>
        {/* By placing here outside of the <Switch>, we render this component for every pages. */}
        <Header currentUser={this.state.currentUser} />
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
}

export default App;
