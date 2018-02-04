import { combineReducers } from "redux";
import NavigationReducer from "./../Navigation/navigation.reducer";
import AuthentificationReducer from "./../Authentification/authentification.reducer";

function lastAction(state = null, action) {
  return action;
}

const AppReducer = combineReducers({
  NavigationReducer,
  AuthentificationReducer,
  lastAction
});

export default AppReducer;
