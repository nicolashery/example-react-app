var React = require('react');
var UserActions = require('../user/UserActions');
var UserStore = require('../user/UserStore');

var LoginPage = React.createClass({
  getInitialState: function() {
    return {
      loggingIn:  UserStore.get('loggingIn'),
      errorMessage: UserStore.errorMessage()
    };
  },

  componentWillMount: function () {
    UserStore.on('changed:loggingIn', this.handleStoreChange);
    UserStore.on('changed:error', this.handleStoreChange);
  },

  componentWillUnmount: function () {
    UserStore.removeListener('changed:loggingIn', this.handleStoreChange);
    UserStore.removeListener('changed:error', this.handleStoreChange);
  },

  render: function() {
    return (
      <div>
        <h1>Login</h1>
        <p>Hint: demo/demo</p>
        <form>
          <p><input ref="username" placeholder="username"/></p>
          <p><input ref="password" placeholder="password"/></p>
          <p>{this.renderButton()}</p>
        </form>
        <p>{this.state.errorMessage}</p>
      </div>
    );
  },

  renderButton: function() {
    var disabled;
    var text = 'Login';

    if (this.state.loggingIn) {
      disabled = true;
      text = 'Logging in...';
    }

    return (
      <button onClick={this.handleLogin} disabled={disabled}>{text}</button>
    );
  },

  handleLogin: function(e) {
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    UserActions.login(username, password);
  },

  handleStoreChange: function() {
    this.setState({
      loggingIn: UserStore.get('loggingIn'),
      errorMessage: UserStore.errorMessage()
    });
  }
});

module.exports = LoginPage;
