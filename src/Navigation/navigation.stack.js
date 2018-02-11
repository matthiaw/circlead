import { StackNavigator } from "react-navigation";
import { Platform } from "react-native";
import Home from "../Components/home";
import Settings from "../Components/settings";
import Roles from "../Components/roles";
import Role from "../Components/role";
import Task from "../Components/task";
import Organisations from "../Components/organisations";
import Authentification from "./../Authentification";
import Rules from "../Components/rules";
import Relations from "../Components/relations";
import Relation from "../Components/relation";
import Functions from "../Components/functions";
import Tasks from "../Components/tasks";
import Competences from "../Components/competences";
import Persons from "../Components/persons";
import Person from "../Components/person";
import Responsibilities from "../Components/responsibilities";
import Authorities from "../Components/authorities";

const navigator = StackNavigator(
{
  home: {
    screen: Home
  },
  responsibilities: {
    screen: Responsibilities
  },
  authorities: {
    screen: Authorities
  },
  persons: {
    screen: Persons
  },
  person: {
    screen: Person
  },
  relations: {
    screen: Relations
  },
  relation: {
    screen: Relation
  },
  rules: {
    screen: Rules
  },
  competences: {
    screen: Competences
  },
  functions: {
    screen: Functions
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
  task: {
    screen: Task
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
