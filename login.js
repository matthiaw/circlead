import React, { Component } from "react";
import { Text, TextInput, StyleSheet, Modal, View, TouchableOpacity } from "react-native";
import Styles from "./../../App.scss";
import { NavigationActions, SafeAreaView } from "react-navigation";
import Firebase from "./../Util/firebase";

export default class Login extends Component {
  static navigationOptions = {
    title: "Login",
    headerTintColor: Styles.ci_Header.color,
    headerStyle: {
      height: Styles.ci_Header.height,
      backgroundColor: Styles.ci_Header.backgroundColor
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      name: `Anonymous`,
      isShowLogin: true,
      email: "",
      password: ""
    }
    this.componentMounted = true;
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.signOut = this.signOut.bind(this);
    this.setStateSave = this.setStateSave.bind(this);
    this.listeningForAuthChange = this.listeningForAuthChange.bind(this);
  }

  setStateSave(value) {
  //  console.log("Component Mounted: "+ this.componentMounted);
    if (this.componentMounted) {
      this.setState(value);
    }
  }

  componentWillUnmount() {
     this.listeningForAuthChange();
     this.componentMounted = false;
  }

  componentDidMount() {
    this.componentMounted = true;
  //  console.log("Mount Login");
    this.login();
  }

  listeningForAuthChange() {
    Firebase.auth().onAuthStateChanged((user) => {
      //console.log('User: '+ user);
      if (user) {
      //  console.log('Found user');
      //  console.log('User-Mail: '+user.email);
        const usermail = user.email;
        this.setStateSave({modalVisible: false, name: usermail});
    //    console.log(this.state);
      } else {
//console.log('username: '+this.props.navigation.state.params.username);
      //  if (this.props.navigation.state.params.username) {
      //    this.setStateSave({name: this.props.navigation.state.params.username, modalVisible: false});
      //  } else {
      if (this.state.name!='Anonymous') {
        this.setStateSave({modalVisible: false, name: this.state.name});
      } else {
      //    console.log('Found NO User');
          this.setStateSave({name: 'Anonymous', modalVisible: true});
        }
      }
      //console.log('auth=' + JSON.stringify(user) + ', modalVisible='+ this.state.modalVisible);
      //console.log('modalVisible='+ this.state.modalVisible);
    //  console.log('user.name='+ this.state.name);

    });
  }

  signOut() {
    Firebase.auth().signOut().then(res => {
      this.setState({isShowLogin:true, modalVisible: true});
  //    console.log("SignOut successfully");
    }).catch((err) => {
      alert("An error occured on signout: "+err.message);
      console.log('An error occured', err);
    })
  }

  register() {
  //  console.log(this.state.email, this.state.password);
    Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
      this.setState({isShowLogin:false, modalVisible: false, name: user.email});
      //this.props.navigation.setParams({username: user.email});
//      console.log("Create user successfully");
    }).catch((err) => {
      alert("An error occured on register: "+err.message);
      console.log('An error occured', err);
    })
  }

  login() {
    console.log(this.state.email, this.state.password);
    if (this.state.email && this.state.password) {
      Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
        this.setState({isShowLogin:false, modalVisible: false, name: user.email});
        //this.props.navigation.setParams({username: user.email});
  //      console.log("Login user successfully");
      }).catch((err) => {      alert("An error occured on login: "+err.message);
        console.log('An error occured', err);
      })
    }
  }

  render() {
    var authUI = "";
    if (this.state.isShowLogin) {
      authUI = <View>
          <Text>Login</Text>
          <Text>E-Mail</Text>
          <TextInput keyboardType="email-address" autoCapitalize="none" value={this.state.email} onChangeText={(t) => this.setState({email: t})}></TextInput>
          <Text>Password</Text>
          <TextInput secureTextEntry={true} value={this.state.password} onChangeText={(t) => this.setState({password: t})}></TextInput>
          <TouchableOpacity onPress={this.login}>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({isShowLogin: false})}>
            <Text>Don't have account?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
          /*  const navigateAction = NavigationActions.navigate({
              routeName: 'home',
              params: {
                username: `${this.state.name}`
              }
            });
            this.props.navigation.dispatch(navigateAction);*/
            this.props.navigation.goBack();
          }}>
            <Text>HOME</Text>
          </TouchableOpacity>
        </View>

    } else {
      authUI =
        <View>
          <Text>Register</Text>
          <Text>E-Mail</Text>
          <TextInput keyboardType="email-address" autoCapitalize="none" value={this.state.email} onChangeText={(t) => this.setState({email: t})}></TextInput>
          <Text>Password</Text>
          <TextInput secureTextEntry={true} value={this.state.password} onChangeText={(t) => this.setState({password: t})}></TextInput>
          <TouchableOpacity onPress={this.register}>
            <Text>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({isShowLogin: true})}>
            <Text>Already have account?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text>HOME</Text>
          </TouchableOpacity>
        </View>
    }
    let signOut;
    if (!this.state.modalVisible) {
      signOut = <TouchableOpacity onPress={this.signOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    }
//console.log('Modal visible: '+this.state.modalVisible);
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            {authUI}
          </View>
        </View>
      </Modal>
      <Text>{this.props.navigation.state.params.name}</Text>
      <Text>Hello {this.state.name}</Text>
      {signOut}
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
  },
});
