var React = require('react');
var $ = require('fluxy').$;
var assign = require('lodash-node/modern/objects/assign');
var UserActions = require('../user/UserActions');
var UserStore = require('../user/UserStore');

var debug = require('debug')('app:AccountPage');

var AccountPage = React.createClass({
  getInitialState: function() {
    return assign({
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
      <div>
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
    debug('handleSave');
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var fullName = this.refs.fullName.getDOMNode().value;
  }
});

module.exports = AccountPage;
