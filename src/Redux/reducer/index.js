import { combineReducers } from "redux";
import LoginReducer from "./loginReducer";
export default combineReducers({ user : LoginReducer });
