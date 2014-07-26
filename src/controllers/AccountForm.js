var React = require('react');
var $ = require('fluxy').$;
var UserActions = require('../user/UserActions');
var UserStore = require('../user/UserStore');
var helpers = require('../helpers');

var debug = require('debug')('app:AccountForm');

var AccountForm = React.createClass({
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
      working: UserStore.get('updating'),
      errorMessage: UserStore.errorMessage()
    };
  },

  render: function() {
    debug('render');
    var user = $.clj_to_js(this.state.user) || {};

    return (
      <div>
        <form>
          <div className="form-group">
            <input className="form-control" ref="username" placeholder="username" defaultValue={user.username}/>
          </div>
          <div className="form-group">
            <input className="form-control" ref="password" placeholder="password"/>
          </div>
          <div className="form-group">
            <input className="form-control" ref="fullName" placeholder="fullName" defaultValue={user.fullName}/>
          </div>
          {this.renderSubmitButton()}
          {' '}
          {this.renderResetButton()}
        </form>
        {this.renderError()}
      </div>
    );
  },

  renderSubmitButton: function() {
    var disabled;
    var text = 'Save';

    if (this.state.working) {
      disabled = true;
      text = 'Saving...';
    }

    return (
      <button
        type="submit"
        className="btn btn-primary"
        onClick={this.handleSave}
        disabled={disabled}>
        {text}
      </button>
    );
  },

  handleSave: function(e) {
    debug('handleSave');
    e.preventDefault();
    var formValues = this.getFormValues();
    UserActions.update(UserStore.token(), formValues);
  },

  getFormValues: function() {
    return {
      username: helpers.trim(this.refs.username.getDOMNode().value),
      password: helpers.trim(this.refs.password.getDOMNode().value),
      fullName: helpers.trim(this.refs.fullName.getDOMNode().value)
    };
  },

  renderResetButton: function() {
    return (
      <button
        type="button"
        className="btn btn-default"
        onClick={this.handleReset}
        disabled={this.state.working}>
        {'Reset'}
      </button>
    );
  },

  handleReset: function(e) {
    debug('handleReset');
    e.preventDefault();
    var user = $.clj_to_js(this.state.user) || {};
    this.refs.username.getDOMNode().value = user.username;
    this.refs.password.getDOMNode().value = '';
    this.refs.fullName.getDOMNode().value = user.fullName;
  },

  renderError: function() {
    var errorMessage = this.state.errorMessage;
    if (!(errorMessage && errorMessage.length)) {
      return;
    }
    return <div className="alert alert-warning">{errorMessage}</div>;
  }
});

module.exports = AccountForm;
