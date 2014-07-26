var Promise = require('bluebird');
var storage = require('../storage');

var DEMO_TOKEN = 'abc123';

var UserService = {
  init: function() {
    return this._loadSession();
  },

  login: function(username, password) {
    var self = this;

    // Success
    if (username === 'demo' && password === 'demo') {
      self._saveSession(DEMO_TOKEN);
      return storage.get('/user')
        .then(function(user) {
          return {
            token: DEMO_TOKEN,
            user: user
          };
        });
    }

    // Fail
    var deferred = Promise.defer();
    setTimeout(function() {
      deferred.reject({message: 'Wrong username or password'});
    }, storage.DELAY);
    return deferred.promise;
  },

  logout: function() {
    var self = this;
    var deferred = Promise.defer();
    setTimeout(function() {
      self._destroySession();
      deferred.resolve();
    }, storage.DELAY);
    return deferred.promise;
  },

  _loadSession: function() {
    var token = window.localStorage.getItem('authToken');

    if (!token) {
      return Promise.resolve();
    }

    return storage.get('/user', {delay: 200})
      .then(function(user) {
        return {
          token: token,
          user: user
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
      var deferred = Promise.defer();
      setTimeout(function() {
        deferred.reject({message: 'Full name must not be empty'});
      }, storage.DELAY);
      return deferred.promise;
    }

    return storage.put('/user', {fullName: fullName})
      .then(function(user) {
        return {
          user: user
        };
      });
  }
};

module.exports = UserService;
