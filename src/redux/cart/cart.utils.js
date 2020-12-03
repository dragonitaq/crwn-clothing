/* We created this utils file for our reducer because we want to keep your reducer as raw and logic free as possible. */

export const addItemToCart = (cartItems, cartItemToAdd) => {
  /* To find if the cartItemToAdd already has it in the existing cartItems array. */
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToAdd.id);

  /* If there is existing item in cartItems array, it will already has the quantity property with it. */
  if (existingCartItem) {
    /* We return a new array in which when the id is matched and we increment the quantity. */
    return cartItems.map((cartItem) => (cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
  }

  /* If there's no existing item, we return the old array and add in the newly added item. They way to add the new item is to spread its all properties into an object with a new property of quantity: 1 added. */
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  if (cartItemToRemove.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) => (cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem));
};
