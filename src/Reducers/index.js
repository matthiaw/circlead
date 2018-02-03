import { combineReducers } from "redux";
import NavigationReducer from "./navigationReducer";
import AuthentificationReducer from "./authentificationReducer";

function lastAction(state = null, action) {
  return action;
}

const AppReducer = combineReducers({
  NavigationReducer,
  AuthentificationReducer,
  lastAction
});

export default AppReducer;
