import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addNavigationHelpers } from "react-navigation";
import NavigationStack from "./navigationStack";

class AppNavigation extends Component {
	static propTypes = {
	    dispatch: PropTypes.func.isRequired,
	    navigationState: PropTypes.object.isRequired,
	};

	_actionEventSubscribers = new Set();

 _addListener = (eventName, handler) => {
	 eventName === 'action' && this._actionEventSubscribers.add(handler);
	 return {
		 remove: () => {
			 this._actionEventSubscribers.delete(handler);
		 },
	 };
 };

 componentDidUpdate(lastProps) {
	 const lastState = lastProps.navigationState;
	 this._actionEventSubscribers.forEach(subscriber => {
		 subscriber({
			 lastState: lastProps.navigationState,
			 state: this.props.navigationState,
			 action: this.props.lastAction,
		 });
	 });
}

  render() {
    const { navigationState, dispatch } = this.props;
    return (
      <NavigationStack
        navigation={addNavigationHelpers({ dispatch, state: navigationState, addListener: this._addListener })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    navigationState: state.NavigationReducer,
		lastAction: state.lastAction
  };
};

export default connect(mapStateToProps)(AppNavigation);
