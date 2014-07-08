var Promise = require('bluebird');

var DEMO_TOKEN = 'abc123';

var DEMO_USER = {
  id: '123',
  username: 'demo',
  fullName: 'Mary Smith'
};

var UserService = {
  init: function() {
    return this._loadSession();
  },

  login: function(username, password) {
    var self = this;
    var deferred = Promise.defer();
    setTimeout(function() {
      if (username !== 'demo' || password !== 'demo') {
        return deferred.reject({message: 'Wrong username or password'});
      }
      self._saveSession(DEMO_TOKEN);
      deferred.resolve({
        token: DEMO_TOKEN,
        user: DEMO_USER
      });
    }, 1000);
    return deferred.promise;
  },

  logout: function() {
    var self = this;
    var deferred = Promise.defer();
    setTimeout(function() {
      self._destroySession();
      deferred.resolve();
    }, 1000);
    return deferred.promise;
  },

  _loadSession: function() {
    var token = window.localStorage.getItem('authToken');
    var deferred = Promise.defer();
    setTimeout(function() {
      if (!token) {
        return deferred.resolve();
      }
      deferred.resolve({
        token: token,
        user: DEMO_USER
      });
    }, 200);
    return deferred.promise;
  },

  _destroySession: function() {
    window.localStorage.removeItem('authToken');
  },

  _saveSession: function(token) {
    window.localStorage.setItem('authToken', token);
  }
};

module.exports = UserService;
