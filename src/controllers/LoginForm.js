var React = require('react');
var UserActions = require('../user/UserActions');
var UserStore = require('../user/UserStore');

var debug = require('debug')('app:LoginForm');

var LoginForm = React.createClass({
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
      loggingIn: UserStore.get('loggingIn'),
      errorMessage: UserStore.errorMessage()
    };
  },

  render: function() {
    debug('render');
    return (
      <div>
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
    debug('handleLogin');
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    UserActions.login(username, password);
  }
});

module.exports = LoginForm;
