import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndOutPage from './pages/sign-in-and-out/sign-in-and-up.component';
import CheckoutPage from './pages/checkout/checkout-component';

import { auth, createUserProfileDoc } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';
import './pages/homepage/homepage.styles.scss';

class App extends React.Component {
  /* In ES6 Class syntax, you are writing a function (the constructor) and the associated prototype object (everything outside the constructor) at the same time. When you write methods that go into that prototype object (the part outside the constructor), you don't need to declare with var/const/let. */
  unsubscribeFromAuth = null;

  /* Once the page is mounted, we then check if there is user authenticated. All previous authenticated users will be recorded in browser session as well for our app (follow domain name) so user can easily sign in back. */
  componentDidMount() {
    /* The props that we pass in this App class component can access to Redux dispatch fn because we wrote mapDispatchToProps() when we export it. We destructure the action fn here in order to use it. */
    const { setCurrentUser } = this.props;

    /* auth.onAuthStateChanged() initiates OPEN SUBSCRIPTION between Firebase server and client side.
    unsubscribeFromAuth is reassigned to the return value of calling auth.onAuthStateChanged(). This method returns another method: firebase.unsubscribe() which can then be used to terminate subscription.
    Since it's open subscription, we have a subscriber here (listening live to auth changes) When user sign out, we get update here. Thus it triggers the IF-ELSE block and dispatch Redux action accordingly. */
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // Check if there is a signed user
      if (userAuth) {
        // Get doc reference and create new user profile doc if it doesn't exist.
        const userRef = await createUserProfileDoc(userAuth);

        /* Get snapshot from query. This is similar to "userRef.get()", instead this method receive a cb. We then use the returned snapshot data to set our currentUser state.
        More importantly, this initiates another OPEN SUBSCRIPTION which need to call the return fn to unsubscribe in the componentWillUnmount lifecycle. I don't know why we don't do so here. */
        userRef.onSnapshot((snapShot) => {
          // We use Redux action to dispatch user action to our reducers.
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        // If there is no signed user, userAuth will set to null via Redux action.
        setCurrentUser(userAuth);
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
        <Header />
        {/* We we use switch, when one route is executing, it ends immediately without routing other routes. */}
        <Switch>
          {/* exact default to true which means the URL must be exactly the stated. */}
          <Route exact path='/' component={HomePage} />
          {/* Notice when we have params further down the URL, we cannot have exact keyword. */}
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          {/* We don't want signed in user to visit /signin again to double login or mess with user authentication. So we redirect them to home route.
          Difference between component & render explained here: https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15160862#questions/8015918 */}
          <Route exact path='/signin' render={() => (this.props.currentUser ? <Redirect to='/' /> : <SignInAndOutPage />)} />
        </Switch>
      </div>
    );
  }
}

/* These code below made every component possible to access props and state(as in props) in Redux. */
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

/* Notice this function also return an object which is required to use for Redux connect(). */
const mapDispatchToProps = (dispatch) => ({
  /* setCurrentUser(user) is fn that we import from user.action.js which will return an action object.
  dispatch below is fn that is from Redux which will receive action object and it will pass to all other reducers. */
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  /* The first setCurrentUser property is a fn that receive user (userAuth) and invoke Redux dispatch fn */
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
