var React = require('react');
var UserActions = require('../user/UserActions');
var UserStore = require('../user/UserStore');
var RouterStore = require('../router/RouterStore');

var LoginPage = React.createClass({
  getInitialState: function() {
    return {
      loggingIn:  UserStore.get('loggingIn'),
      errorMessage: UserStore.errorMessage(),
      redirectUri: RouterStore.redirectAfterLoginUri()
    };
  },

  componentWillMount: function () {
    UserStore.on('changed:loggingIn', this.handleUserStoreChange);
    UserStore.on('changed:error', this.handleUserStoreChange);
    RouterStore.on('changed:redirectAfterLogin', this.handleRouterStoreChange);
  },

  componentWillUnmount: function () {
    UserStore.removeListener('changed:loggingIn', this.handleUserStoreChange);
    UserStore.removeListener('changed:error', this.handleUserStoreChange);
    RouterStore.removeListener('changed:redirectAfterLogin',
      this.handleRouterStoreChange);
  },

  render: function() {
    return (
      <div>
        <h1>Login</h1>
        {this.renderRedirectMessage()}
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

  renderRedirectMessage: function() {
    var uri = this.state.redirectUri;
    if (!uri) {
      return null;
    }

    return (
      <p>
        {'After logging in you will be redirected to '}
        <strong>{uri}</strong>
      </p>
    );
  },

  handleLogin: function(e) {
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    UserActions.login(username, password);
  },

  handleUserStoreChange: function() {
    this.setState({
      loggingIn: UserStore.get('loggingIn'),
      errorMessage: UserStore.errorMessage()
    });
  },

  handleRouterStoreChange: function() {
    this.setState({
      redirectUri: RouterStore.redirectAfterLoginUri()
    });
  }
});

module.exports = LoginPage;
