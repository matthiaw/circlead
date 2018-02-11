import { StackNavigator } from "react-navigation";
import { Platform } from "react-native";
import Home from "../Components/home";
import Settings from "../Components/settings";
import Roles from "../Components/roles";
import Role from "../Components/role";
import Task from "../Components/task";
import Authority from "../Components/authority";
import Competence from "../Components/competence";
import Organisations from "../Components/organisations";
import Organisation from "../Components/organisation";
import Authentification from "./../Authentification";
import Rules from "../Components/rules";
import Rule from "../Components/rule";
import Relations from "../Components/relations";
import Relation from "../Components/relation";
import Functions from "../Components/functions";
import Tasks from "../Components/tasks";
import Competences from "../Components/competences";
import Persons from "../Components/persons";
import Person from "../Components/person";
import Responsibilities from "../Components/responsibilities";
import Responsibility from "../Components/responsibility";
import Authorities from "../Components/authorities";
import Func from "../Components/function";

const navigator = StackNavigator(
{
  home: {
    screen: Home
  },
  function: {
    screen: Func
  },
  rule: {
    screen: Rule
  },
  responsibility: {
    screen: Responsibility
  },
  responsibilities: {
    screen: Responsibilities
  },
  competence: {
    screen: Competence
  },
  authorities: {
    screen: Authorities
  },
  authority: {
    screen: Authority
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
  organisation: {
    screen: Organisation
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
