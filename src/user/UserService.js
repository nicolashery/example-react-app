var Promise = require('bluebird');
var backend = require('../mock/backend');

var UserService = {
  init: function() {
    return this._loadSession();
  },

  login: function(username, password) {
    var self = this;

    return backend.post('/login', null, {
      username: username,
      password: password
    })
    .then(function(resp) {
      if (resp.status !== 200) {
        return Promise.reject(resp.body);
      }

      self._saveSession(resp.body && resp.body.token);
      return resp.body;
    });
  },

  logout: function(token) {
    var self = this;

    return backend.post('/logout', token)
    .then(function(resp) {
      if (resp.status !== 200) {
        return Promise.reject(resp.body);
      }

      self._destroySession();
      return resp.body;
    });
  },

  _loadSession: function() {
    var token = window.localStorage.getItem('authToken');

    if (!token) {
      return Promise.resolve();
    }

    var originalDelay = backend.DELAY;
    backend.DELAY = 300;
    return backend.get('/user', token)
    .then(function(resp) {
      backend.DELAY = originalDelay;

      if (resp.status !== 200) {
        // Not a valid token, return empty session
        return Promise.resolve();
      }

      return {
        token: token,
        user: resp.body
      };
    });
  },

  _destroySession: function() {
    window.localStorage.removeItem('authToken');
  },

  _saveSession: function(token) {
    window.localStorage.setItem('authToken', token);
  },

  update: function(token, attributes) {
    var deferred = Promise.defer();

    // Only support updating fullName for this demo
    var fullName = attributes.fullName;
    if (!(fullName && fullName.length)) {
      return Promise.reject({message: 'Full name must not be empty'});
    }

    return backend.put('/user', token, {fullName: fullName})
    .then(function(resp) {
      if (resp.status !== 200) {
        return Promise.reject(resp.body);
      }

      return resp.body;
    });
  }
};

module.exports = UserService;
