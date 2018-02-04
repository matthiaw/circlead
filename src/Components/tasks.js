import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import {NO_Title, Styles} from "./../Util";

export default class Tasks extends Component {
  static navigationOptions = NO_Title("Aufgaben");
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "yellow" }}>
        <Text>{this.props.navigation.state.params.param}</Text>
      </View>
    );
  }
}
