import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, View, Button } from 'react-native';
import { login } from '../Actions/authentification';
import Firebase from "./../Util/firebase";

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            page: 'Login',
            username: '',
            password: ''
        };
    }

    get alt () { return (this.state.page === 'Login') ? 'SignUp' : 'Login'; }

    handleClick (e) {
        e.preventDefault();

        // Sign up
        if (this.state.page === 'SignUp') {
          console.log("SignUp");
          Firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password).then((user) => {
            this.props.onLogin(user.email, this.state.password);
          }).catch((err) => {
            alert("An error occured on register: "+err.message);
            this.setState({ username: '', password: '' });
            console.log('An error occured on signup', err);
          })
        } else {
          // Login
          console.log("Login: "+this.state.username+", "+ this.state.password);
          Firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then((user) => {
            this.props.onLogin(user.email, this.state.password);
          }).catch((err) => {
            alert("An error occured on login: "+err.message);
            this.setState({ username: '', password: '' });
            console.log('An error occured on login', err);
          })
        }
    }

    togglePage (e) {
        this.setState({ page: this.alt });
        e.preventDefault();
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text style={{fontSize: 27}}>{this.state.page}</Text>
                <TextInput
                    placeholder='Email Address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType='email-address'
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })} />
                <TextInput
                    placeholder='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })} />
                <View style={{margin: 7}}/>
                <Button onPress={(e) => this.handleClick(e)} title={this.state.page}/>
                <View style={{margin: 7, flexDirection: 'row', justifyContent: 'center'}}>
                    <Text onPress={(e) => this.togglePage(e)} style={{fontSize: 12, color: 'blue'}}>
                        {this.alt}
                    </Text>
                </View>
            </ScrollView>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.AuthentificationReducer.isLoggedIn
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, password) => { dispatch(login(username, password)); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
