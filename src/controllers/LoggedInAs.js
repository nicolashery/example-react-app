var React = require('react');
var $ = require('fluxy').$;
var UserStore = require('../user/UserStore');
var UserActions = require('../user/UserActions');
var NavLink = require('./NavLink');

var debug = require('debug')('app:LoggedInAs');

var LoggedInAs = React.createClass({
  getInitialState: function() {
    return this.getUserStoreState();
  },

  componentDidMount: function () {
    debug('componentDidMount');
    UserStore.addWatch(this.handleUserStoreChange);
  },

  componentWillUnmount: function () {
    debug('componentWillUnmount');
    UserStore.removeWatch(this.handleUserStoreChange);
  },

  handleUserStoreChange: function() {
    debug('handleUserStoreChange');
    this.setState(this.getUserStoreState());
  },

  getUserStoreState: function() {
    return {
      user: UserStore.loggedInUser(),
      loggingOut: UserStore.get('loggingOut')
    };
  },

  render: function(path) {
    debug('render');
    return (
      <span>
        {'Logged in as '}
        {this.renderUserDisplayName()}
        {' '}
        {this.renderLogout()}
      </span>
    );
  },

  renderUserDisplayName: function() {
    var fullName = $.get(this.state.user, 'fullName', 'Anonymous');
    return <strong>{fullName}</strong>;
  },

  renderLogout: function() {
    if (this.state.loggingOut) {
      return <span>Logging out...</span>;
    }

    return <a href="#" onClick={this.handleLogout}>Logout</a>;
  },

  handleLogout: function(e) {
    debug('handleLogout');
    e.preventDefault();
    UserActions.logout(UserStore.get('token'));
  }
});

module.exports = LoggedInAs;
