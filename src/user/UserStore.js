var Fluxy = require('fluxy');
var $ = Fluxy.$;
var UserConstants = require('./UserConstants');
var RouterActions = require('../router/RouterActions');

module.exports = Fluxy.createStore({
  getInitialState: function() {
    return {
      token: null,
      user: null,
      loggingIn: false,
      loggingOut: false,
      error: null
    };
  },

  isAuthenticated: function() {
    return Boolean(this.get('token'));
  },

  loggedInUser: function() {
    return this.get('user');
  },

  errorMessage: function() {
    return this.get(['error', 'message']);
  },

  actions: [
    [UserConstants.LOGIN, function(payload) {
      this.set('token', null);
      this.set('user', null);
      this.set('loggingIn', true);
      this.set('error', null);
    }],

    [UserConstants.LOGIN_SUCCESS, function(payload) {
      this.set('token', payload.token);
      this.set('user', $.js_to_clj(payload.user));
      this.set('loggingIn', false);

      // Calling an Action from a Store, is that a Flux anti-pattern?
      RouterActions.redirectAfterLogin();
    }],

    [UserConstants.LOGIN_FAIL, function(payload) {
      this.set('error', $.js_to_clj(payload.error));
      this.set('loggingIn', false);
    }],

    [UserConstants.LOGOUT, function(payload) {
      this.set('loggingOut', true);
      this.set('error', null);
    }],

    [UserConstants.LOGOUT_SUCCESS, function(payload) {
      this.set('token', null);
      this.set('user', null);
      this.set('loggingOut', false);

      // Calling an Action from a Store, is that a Flux anti-pattern?
      RouterActions.redirectAfterLogout();
    }],

    [UserConstants.LOGOUT_FAIL, function(payload) {
      this.set('error', $.js_to_clj(payload.error));
      this.set('loggingOut', false);
    }]
  ]
});
