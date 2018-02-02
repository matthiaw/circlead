import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView, StatusBar, Dimensions } from "react-native";
import { NavigationActions, SafeAreaView } from "react-navigation";
import Image from 'react-native-remote-svg';
import { connect } from "react-redux";
import Styles from "./../../App.scss";
const Uuid = require('uuid/v1');
import Item from "./item";

const componentName = 'home';

var renderData = JSON.parse(`{
    "entries": [
      {
        "label": "Rollen",
        "description" : "Eine Liste aller Rollen",
        "route": "roles",
        "param": ""
      },
      {
        "label": "Einstellungen",
        "description" : "Einstellungen von Circlead",
        "route": "settings",
        "param": "Settings parameter"
      },
      {
        "label": "Organisations",
        "description" : "List of organisations",
        "route": "organisations",
        "param": ""
      },
      {
        "label": "Authentizierung",
        "description" : "Login / SignUp",
        "route": "authentification",
        "param": ""
      }
    ]
}`);

class HomeView extends Component {

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  static navigationOptions = {
    title: "Circlead",
    headerTintColor: Styles.ci_Header.color,
    headerStyle: {
      height: Styles.ci_Header.height,
      backgroundColor: Styles.ci_Header.backgroundColor
    },
    headerLeft: <Image source={require('./../../assets/logo.svg')} />
  };

  componentWillUpdate(nextProps, nextState) {
    //console.log('Will Update '+componentName);
  }

  componentDidMount() {
    //console.log('Did Mount '+componentName);
  }

  componentWillUnmount() {
     //console.log('Will Unmount '+componentName);
   }

  renderItem(item, navigation) {
    return (
      <Item key={Uuid()} label={item.label} description={item.description} onPress={ () => {
        const param = item.param;
        const route = item.route;
        const navigateAction = NavigationActions.navigate({
          routeName: route,
          params: { param: param }
        });
        navigation.dispatch(navigateAction);
      }} />
    )
  }

  render() {
    let loggedUser;
    if (this.props.username) {
      loggedUser = <Text>
          {`Welcome ${this.props.username}`}
      </Text>
    }
    return (
      <View style={{ flex: 1 }}>
        {loggedUser}
        <ScrollView style={{ flex: 1 }}>
          { renderData.entries.map(item => this.renderItem(item, this.props.navigation)) }
        </ScrollView>
          <StatusBar barStyle="light-content" />
        </View>
    );
  }
}

//export default HomeView;

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.AuthentificationReducer.username
    };
}

export default connect(mapStateToProps)(HomeView);
