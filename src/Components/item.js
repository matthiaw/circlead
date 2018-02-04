import React, { Component } from "react";
import { Text, TouchableOpacity} from "react-native";
import Styles from "./../../App.scss";

class Item extends Component {
  render() {
    return (
      <TouchableOpacity
        style={Styles.ci_itemBox}
        onPress={ this.props.onPress }
      >
      <Text style={Styles.ci_itemTitle}>
        {this.props.label}
      </Text>
      <Text style={Styles.ci_itemDescription}>
        {this.props.description}
      </Text>
     </TouchableOpacity>
    )
  }
}

export default Item;
