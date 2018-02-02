import { combineReducers } from "redux";
import NavigationReducer from "./navigationReducer";
import AuthentificationReducer from "./authentificationReducer";

const AppReducer = combineReducers({
  NavigationReducer,
  AuthentificationReducer
});

export default AppReducer;
