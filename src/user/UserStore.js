var Flux = require('fluxy');
var UserConstants = require('./UserConstants');

module.exports = Flux.createStore({
  getInitialState: function() {
    return {
      token: null,
      user: null,
      loggingIn: false,
      loggingOut: false,
      error: null
    };
  },

  actions: {
    handleLogin: [UserConstants.LOGIN, function(payload) {
      this.set('token', null);
      this.set('user', null);
      this.set('loggingIn', true);
      this.set('error', null);
    }],

    handleLoginSuccess: [UserConstants.LOGIN_SUCCESS, function(payload) {
      this.set('token', payload.token);
      this.set('user', payload.user);
      this.set('loggingIn', false);
    }],

    handleLoginFail: [UserConstants.LOGIN_FAIL, function(payload) {
      this.set('error', payload.error);
      this.set('loggingIn', false);
    }],

    handleLogout: [UserConstants.LOGOUT, function(payload) {
      this.set('loggingOut', true);
      this.set('error', null);
    }],

    handleLogoutSuccess: [UserConstants.LOGOUT_SUCCESS, function(payload) {
      this.set('token', null);
      this.set('user', null);
      this.set('loggingOut', false);
    }],

    handleLogoutFail: [UserConstants.LOGOUT_FAIL, function(payload) {
      this.set('error', payload.error);
      this.set('loggingOut', false);
    }]
  },

  isAuthenticated: function() {
    return Boolean(this.get('token'));
  },

  loggedInUser: function() {
    return this.get('user');
  },

  errorMessage: function() {
    return this.get('error.message');
  }
});
