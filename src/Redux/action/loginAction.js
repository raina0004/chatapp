// Your existing loginUserAction.js file

import { SET_USER_DETAILS, SET_SNACK, SET_SNACK_INFO } from './types';

export const loginUserAction = (data) => async (dispatch) => {
  try {
    // Dispatch the setUserAction here
    console.log(data, "this is the data called");
    dispatch(setUserAction(data));
  } catch (error) {
    dispatch({ type: SET_SNACK, payload: true });
    dispatch({ type: SET_SNACK_INFO, payload: { msg: error.response.data, snackSeverity: "error" } });
  }
};

// Define setUserAction here
export const setUserAction = (data) => {
  return {
    type: SET_USER_DETAILS,
    payload: data,
  };
};
