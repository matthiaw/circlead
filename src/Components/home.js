import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView, StatusBar, Dimensions } from "react-native";
import { NavigationActions, SafeAreaView } from "react-navigation";
import {LoggedUser, Styles, Uuid, NO_TitleIcon} from "./../Util";
import Item from "./item";

var renderData = JSON.parse(`{
    "entries": [
      {
        "label": "Rollen",
        "description" : "Eine Liste aller Rollen",
        "route": "roles",
        "param": ""
      },
      {
        "label": "Kompetenzen",
        "description" : "Liste aller Kompetenzen",
        "route": "competences",
        "param": "test param"
      },
      {
        "label": "Aufgaben",
        "description" : "Liste aller Aufgaben",
        "route": "tasks",
        "param": "test param"
      },
      {
        "label": "Verantwortungen",
        "description" : "Liste aller Verantwortungen",
        "route": "responsibilities",
        "param": "test param"
      },
      {
        "label": "Befugnisse",
        "description" : "Liste aller Befugnisse",
        "route": "authorities",
        "param": "test param"
      },
      {
        "label": "Prinzipien",
        "description" : "Liste aller Prinzipien",
        "route": "rules",
        "param": "test param"
      },
      {
        "label": "Organisationen",
        "description" : "Liste aller Organisationen",
        "route": "organisations",
        "param": ""
      },
      {
        "label": "Funktionsbereiche",
        "description" : "Liste aller Funktionsbereiche",
        "route": "functions",
        "param": "test param"
      },
      {
        "label": "Personen",
        "description" : "Liste aller Personen",
        "route": "persons",
        "param": "test param"
      },
      {
        "label": "Einstellungen",
        "description" : "Einstellungen von Circlead",
        "route": "settings",
        "param": "Settings parameter"
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
