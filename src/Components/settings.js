import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import {NO_Title, Styles} from "./../Util";

export default class Settings extends Component {
  static navigationOptions = NO_Title("Einstellungen");
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "orange" }}>
        <Text>{this.props.navigation.state.params.param}</Text>
      </View>
    );
  }
}
