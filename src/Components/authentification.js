import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './login';
import Secured from './secured';

class Authentification extends Component {
    render() {
        if (this.props.isLoggedIn) {
            return <Secured />;
        } else {
            return <Login />;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state.AuthentificationReducer);
    return {
        isLoggedIn: state.AuthentificationReducer.isLoggedIn
    };
}

export default connect(mapStateToProps)(Authentification);
