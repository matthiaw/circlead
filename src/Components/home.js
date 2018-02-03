import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView, StatusBar, Dimensions } from "react-native";
import { NavigationActions, SafeAreaView } from "react-navigation";
import {LoggedUser, Styles, Uuid, NO_TitleIcon} from "./../Util/Utils";
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
        "label": "Organisationen",
        "description" : "Liste aller Organisationen",
        "route": "organisations",
        "param": ""
      },
      {
        "label": "Aufgaben",
        "description" : "Liste aller Aufgaben",
        "route": "tasks",
        "param": "test param"
      },
      {
        "label": "Authentizierung",
        "description" : "Anmeldung / Registrierung",
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

  static navigationOptions = NO_TitleIcon("Circlead");

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

export default LoggedUser(HomeView);
