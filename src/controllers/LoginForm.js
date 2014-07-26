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
        <p className="text-muted">Hint: demo/demo</p>
        <form>
          <div className="form-group">
            <input className="form-control" ref="username" placeholder="username"/>
          </div>
          <div className="form-group">
            <input className="form-control" ref="password" placeholder="password"/>
          </div>
          {this.renderButton()}
        </form>
        {this.renderError()}
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
      <button
        type="submit"
        className="btn btn-primary"
        onClick={this.handleLogin}
        disabled={disabled}>
        {text}
      </button>
    );
  },

  handleLogin: function(e) {
    debug('handleLogin');
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    UserActions.login(username, password);
  },

  renderError: function() {
    var errorMessage = this.state.errorMessage;
    if (!(errorMessage && errorMessage.length)) {
      return;
    }
    return <div className="alert alert-warning">{errorMessage}</div>;
  }
});

module.exports = LoginForm;
