import { userActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
};

/* When state is undefined or we don't pass in any of it to this param, it will fall back to INITIAL_STATE. Keep in mind null is a value, so if we pass null into this param, it will not fall back to INITIAL_STATE. */
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    /* If the action type is not matching, then return the original state object. */
    default:
      return state;
  }
};

export default userReducer;
