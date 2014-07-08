var React = require('react');
var UserActions = require('../user/UserActions');
var UserStore = require('../user/UserStore');

var Logout = React.createClass({
  getInitialState: function() {
    return {
      loggingOut:  UserStore.get('loggingOut')
    };
  },

  componentWillMount: function () {
    UserStore.on('changed:loggingOut', this.handleStoreChange);
  },

  componentWillUnmount: function () {
    UserStore.removeListener('changed:loggingOut', this.handleStoreChange);
  },

  render: function() {
    if (this.state.loggingOut) {
      return <span>Logging out...</span>;
    }

    return <a href="#" onClick={this.handleLogout}>Logout</a>;
  },

  handleStoreChange: function() {
    this.setState({
      loggingOut: UserStore.get('loggingOut')
    });
  },

  handleLogout: function(e) {
    e.preventDefault();
    UserActions.logout(UserStore.get('token'));
  }
});

module.exports = Logout;
