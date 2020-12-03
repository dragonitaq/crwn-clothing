import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/* This is how to import SVG in React. */
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart-selector';

import './header.styles.scss';

/* Because we use mapStateToProps(), the props we get pass in here are the state directly from Redux store. The props now has the property of this.props.currentUser state. We destructure it here in order to use it.
I think only the component that has bind to this specific state in Redux receive signal when this specific state changed, not every other component. This way, React only re-render specify component when needed. See there we don't need to explicitly call setState(), when React detect state change, it will just re-render. */
const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/contact'>
        CONTACT
      </Link>
      {currentUser ? (
        /* Because sign out won't navigate to other route, so we are not using <a> tag here. */
        <div
          className='option'
          onClick={() => {
            auth.signOut();
          }}
        >
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {/* if hidden is true, return nohting */}
    {hidden ? null : <CartDropdown />}
  </div>
);

/* These code below made every component possible to access props (and state as props) in Redux. */

/* The state here is the state from root-reducer. We can access it because of <Provider store={store}> code.
The "currentUser" property name must match the props name that we expect to pass into this Header component.
Using createStructuredSelector, it will pass in the global state under the hood into each subsequent selector. Useful if we want to assign many slices of state all together. */
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

/* Connect is higher order component, which is a fn that takes in another component and upgrade it. Notice here we immediately invoke the returned fn from connect() to turn the Header into an enhanced component. Enhanced component simply means that it can now access to redux features.
When call connect fn and pass in mapStateToProps, it's expecting that we will have declared the parameter of state, and connect will give it our entire redux state (which is what gets returned by our root reducer). The <Provider store={store}> code is definitely how we give react-redux the actual value of our root reducer, as well as give our react application the context of everything related to our redux code. */
export default connect(mapStateToProps)(Header);
