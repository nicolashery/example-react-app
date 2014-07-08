var React = require('react');
var UserActions = require('../user/UserActions');
var UserStore = require('../user/UserStore');

var AccountPage = React.createClass({
  getInitialState: function() {
    return {
      user:  UserStore.loggedInUser(),
      working: false
    };
  },

  componentWillMount: function () {
    UserStore.on('changed:user', this.handleStoreChange);
  },

  componentWillUnmount: function () {
    UserStore.removeListener('changed:user', this.handleStoreChange);
  },

  handleStoreChange: function() {
    this.setState({
      user: UserStore.loggedInUser()
    });
  },

  render: function() {
    var user = this.state.user || {};

    return (
      <div>
        <h1>Account</h1>
        <form>
          <p><input ref="username" placeholder="username" defaultValue={user.username}/></p>
          <p><input ref="password" placeholder="password"/></p>
          <p><input ref="fullName" placeholder="fullName" defaultValue={user.fullName}/></p>
          <p>{this.renderButton()}</p>
        </form>
      </div>
    );
  },

  renderButton: function() {
    var disabled;
    var text = 'Save';

    if (this.state.working) {
      disabled = true;
      text = 'Saving...';
    }

    return (
      <button onClick={this.handleSave} disabled={disabled}>{text}</button>
    );
  },

  handleSave: function(e) {
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var fullName = this.refs.fullName.getDOMNode().value;
    console.log('save');
  }
});

module.exports = AccountPage;
