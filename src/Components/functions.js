import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import {NO_Title, Styles} from "./../Util";

export default class Functions extends Component {
  static navigationOptions = NO_Title("Funktionsbereich");
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "orange" }}>
        <Text>{this.props.navigation.state.params.param}</Text>
      </View>
    );
  }
}
