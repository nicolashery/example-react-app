var React = require('react');
var $ = require('fluxy').$;
var fn = require('fn.js');
var UserActions = require('../user/UserActions');
var UserStore = require('../user/UserStore');

var debug = require('debug')('app:AccountForm');

var AccountForm = React.createClass({
  getInitialState: function() {
    return fn.merge({
      working: false
    }, this.getUserStoreState());
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
      user: UserStore.loggedInUser()
    };
  },

  render: function() {
    debug('render');
    var user = $.clj_to_js(this.state.user) || {};

    return (
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
        {this.renderButton()}
      </form>
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
      <button
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
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var fullName = this.refs.fullName.getDOMNode().value;
  }
});

module.exports = AccountForm;
