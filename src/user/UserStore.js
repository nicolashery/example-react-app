var Fluxy = require('fluxy');
var $ = Fluxy.$;
var UserConstants = require('./UserConstants');

module.exports = Fluxy.createStore({
  name: 'UserStore',

  getInitialState: function() {
    return {
      token: null,
      user: null,
      loginRequest: null,
      logoutRequest: null,
      updateRequest: null
    };
  },

  isAuthenticated: function() {
    return Boolean(this.get('token'));
  },

  token: function() {
    return this.get('token');
  },

  loggedInUser: function() {
    return this.get('user');
  },

  isLoggingIn: function() {
    return this.get(['loginRequest', 'status']) === 'pending';
  },

  loginErrorMessage: function() {
    return this.get(['loginRequest', 'error', 'message']);
  },

  isLoggingOut: function() {
    return this.get(['logoutRequest', 'status']) === 'pending';
  },

  logoutErrorMessage: function() {
    return this.get(['logoutRequest', 'error', 'message']);
  },

  isUpdating: function() {
    return this.get(['updateRequest', 'status']) === 'pending';
  },

  isUpdateSuccessfull: function() {
    return this.get(['updateRequest', 'status']) === 'success';
  },

  updateErrorMessage: function() {
    return this.get(['updateRequest', 'error', 'message']);
  },

  actions: [
    [UserConstants.LOGIN, function(payload) {
      this.set('token', null);
      this.set('user', null);
      this.setFromJS('loginRequest',{
        status: 'pending',
        payload: payload
      });
    }],

    [UserConstants.LOGIN_SUCCESS, function(payload) {
      this.set('token', payload.token);
      this.setFromJS('user', payload.user);
      this.set('loginRequest', function(request) {
        return $.assoc(request, 'status', 'success');
      });
    }],

    [UserConstants.LOGIN_FAIL, function(payload) {
      this.set('loginRequest', function(request) {
        return $.assoc(request,
          'status', 'error',
          'error', $.js_to_clj(payload.error)
        );
      });
    }],

    [UserConstants.LOGOUT, function(payload) {
      this.setFromJS('logoutRequest', {
        status: 'pending',
        payload: payload
      });
    }],

    [UserConstants.LOGOUT_SUCCESS, function(payload) {
      this.set('token', null);
      this.set('user', null);
      this.set('logoutRequest', function(request) {
        return $.assoc(request, 'status', 'success');
      });
    }],

    [UserConstants.LOGOUT_FAIL, function(payload) {
      this.set('logoutRequest', function(request) {
        return $.assoc(request,
          'status', 'error',
          'error', $.js_to_clj(payload.error)
        );
      });
    }],

    [UserConstants.USER_UPDATE, function(payload) {
      this.setFromJS('updateRequest', {
        status: 'pending',
        payload: payload
      });
    }],

    [UserConstants.USER_UPDATE_SUCCESS, function(payload) {
      this.setFromJS('user', payload.user);
      this.set('updateRequest', function(request) {
        return $.assoc(request, 'status', 'success');
      });
    }],

    [UserConstants.USER_UPDATE_FAIL, function(payload) {
      this.set('updateRequest', function(request) {
        return $.assoc(request,
          'status', 'error',
          'error', $.js_to_clj(payload.error)
        );
      });
    }],

    [UserConstants.USER_CLEAR_REQUESTS, function() {
      this.set('loginRequest', null);
      this.set('logoutRequest', null);
      this.set('updateRequest', null);
    }]
  ]
});
