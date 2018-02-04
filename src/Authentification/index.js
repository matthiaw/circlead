import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, ScrollView, StatusBar, Dimensions } from "react-native";
import Login from './login.component';
import Secured from './secured.component';
import {NO_Title, Styles} from "./../Util";

class Authentification extends Component {
  static navigationOptions = NO_Title("Authentifzierung");
    render() {
        if (this.props.isLoggedIn) {
            return <Secured />;
        } else {
            return <Login />;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
      isLoggedIn: state.AuthentificationReducer.isLoggedIn
  };
}

export default connect(mapStateToProps)(Authentification);
