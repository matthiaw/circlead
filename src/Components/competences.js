import React, { Component } from "react";
import { Text, View, TouchableHighlight, TouchableOpacity, ListView, StatusBar, ScrollView, StyleSheet } from "react-native";
import Firebase from "./../Util/firebase";
import Item from "./item";
import {Uuid, Styles} from "./../Util";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationActions, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";

var db = Firebase.firestore();

const list = ['Loading...']

export default class Competences extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.componentMounted = false;
    this.state = {
      dataSource: this.ds.cloneWithRows(list),
    };

    this.mounted = true;
    this.renderItem = this.renderItem.bind(this)
    this.setItemsFromFirestore = this.setItemsFromFirestore.bind(this);
  }

  setItemsFromFirestore() {
    var roles = db.collection("competences").get();
    roles.then((querySnapshot) => {
      // get children as an array
      var items = [];
      querySnapshot.forEach((child) => {
        items.push({
          title: `${child.data().title}`,
          description: `${child.data().description}`,
          id: `${child.id}`
        });
      });

      if(this.componentMounted){
        this.setState({
          dataSource: this.ds.cloneWithRows(items),
        });
      }
    });
  }

  componentWillUnmount() {
     this.componentMounted = false;
  }

  componentWillUpdate(nextProps, nextState) {
    this.setItemsFromFirestore();
  }

  componentDidMount() {
    this.componentMounted = true;
    this.setItemsFromFirestore();
  }

  renderItem(item, navigation) {
    return (
      <Item key={Uuid()} label={item.title} description={item.description} onPress={ () => {
        const param = item.param;
        const route = item.route;
        const navigateAction = NavigationActions.navigate({
          routeName: 'competence',
          params: {
            title: `${item.title}`,
            description: `${item.description}`,
            id: `${item.id}`
          }
        });
        navigation.dispatch(navigateAction);
      }} />
    )
  }

  static navigationOptions = props => {
    const { navigation } = props;
    const { state, setParams } = navigation;
    const { params } = state;
    return {
      title: "Kompetenzen",
      headerTintColor: Styles.ci_Header.color,
      headerStyle: {
        height: Styles.ci_Header.height,
        backgroundColor: Styles.ci_Header.backgroundColor
      },
      headerRight: (
        <FontAwesome
          name= {'plus'}
          size={18}
          style={{ color: Styles.ci_Header.color, paddingHorizontal: 5}}
          onPress={() => {
            const id = `${Uuid()}`;
            var data = {
              id: `${id}`,
              title: `Neue Kompetenz (${id.substring(0,6)}...)`,
              description: '',
              status: 'draft'
            };
            var setDoc = db.collection('competences').doc(id).set(data);
          }}
        />
      )
    };
  };

  // https://console.firebase.google.com/u/0/project/circlead-f1cab/database/firestore/data~2Froles~2FNOa1SiMVzXgzpYL0upvg
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={item => this.renderItem(item, this.props.navigation)} />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }

}
