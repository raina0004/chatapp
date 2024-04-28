import { SET_USER_DETAILS } from '../action/types'

const initialState = {
  userDetails: null
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    default:
      return state;
  }
};

export default LoginReducer;