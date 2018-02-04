import { StackNavigator } from "react-navigation";
import { Platform } from "react-native";
import Home from "../Components/home";
import Settings from "../Components/settings";
import Roles from "../Components/roles";
import Role from "../Components/role";
import Organisations from "../Components/organisations";
import Authentification from "./../Authentification";
import Tasks from "../Components/tasks";

const navigator = StackNavigator(
{
  home: {
    screen: Home
  },
  roles: {
    screen: Roles
  },
  settings: {
    screen: Settings
  },
  role: {
    screen: Role
  },
  organisations: {
    screen: Organisations
  },
  tasks: {
    screen: Tasks
  },
  authentification: {
    screen: Authentification
  }
 },
 {
  initialRouteName: 'home',
  headerMode: 'screen',

  /*
 * Use modal on iOS because the card mode comes from the right,
 * which conflicts with the drawer example gesture
 */
  mode: Platform.OS === 'ios' ? 'modal' : 'card',
 }
);

export default navigator;
