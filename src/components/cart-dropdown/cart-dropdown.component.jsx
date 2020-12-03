import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart-selector';
import { toggleCartHidden } from '../../redux/cart/cart-actions';

import './cart-dropdown.styles.scss';

/* After destruct cartItems, we get an array of cart item objects. */
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
        // zero value is falsy value
        cartItems.length ? cartItems.map((cartItem) => <CartItem key={cartItem.id} item={cartItem} />) : <span className='empty-message'>Empty cart</span>
      }
    </div>
    {/* We can choose to use Link or history. Using Link create a new element(anchor tag). history in order hand, doesn't need you to change existing element, it is more flexible. history.push doesn't even need component or direct user interaction to work, while link must exist as component and require direct user interaction.
    When we use link in this context, we are essentially wrapping the button in a modified <a/> tag which does work, but it's a bad practice according to the html5 spec */}
    <CustomButton
      onClick={() => {
        history.push('/checkout');
        // We use dispatch shorthand here.
        dispatch(toggleCartHidden());
      }}
    >
      CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

/* And the reason we can do this is because all of our higher order components return components but also take components as their arguments. So withRouter is just taking the component that got returned from our connect call as its component argument.
Now the order in which we wrap them matters because with router will be what passes the match, history & location objects into the component that is being wrapped.
In way, our component will receive match, history & location as props. */
export default withRouter(connect(mapStateToProps)(CartDropdown));
