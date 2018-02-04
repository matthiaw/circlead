import React, { Component } from "react";
import _Styles from "./../../App.scss";
import SvgImage from 'react-native-remote-svg';
import { connect } from "react-redux";

/**
 * Context: React-Navigation
 *
 * Returns Default Navigation-Options where HeaderTitle could be defined
 *
 */
export function NO_Title(title) {
  return {
    title: `${title}`,
    headerTintColor: _Styles.ci_Header.color,
    headerStyle: {
      height: _Styles.ci_Header.height,
      backgroundColor: _Styles.ci_Header.backgroundColor
    }
  }
}

/**
 * Context: React-Navigation
 *
 * Returns Navigation-Options where HeaderTitle could be defined. App-Icon is embedded from assets.
 *
 */
export function NO_TitleIcon(title) {
  return {
    title: `${title}`,
    headerTintColor: Styles.ci_Header.color,
    headerStyle: {
      height: Styles.ci_Header.height,
      backgroundColor: Styles.ci_Header.backgroundColor
    },
    headerLeft: <SvgImage source={require('./../../assets/logo.svg')} />
  }
}

/**
 * Styles of App. Just use to avoid Line import Styles from "./../../App.scss";
 */
export const Styles = _Styles;

/**
 * Generator of UUID. Usage is Uuid().
 */
export const Uuid = require('uuid/v1');

/**
 * Context: Redux Authentification
 *
 * Connecting Username from Autheification to React Component
 *
 * Parameter:
 * - component: React Component which is connected to redux-state username
 */
export function LoggedUser (component) {
  return connect((state, ownProps) => {
    return {
        username: state.AuthentificationReducer.username
    };
  })(component);
}
