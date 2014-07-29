var mori = require('fluxy').$;
var Promise = require('bluebird');
var fn = require('fn.js');
var data = require('./data');

var debug = require('bows')('backend');

// Mock backend to persist data
// uses browser's localStorage
var backend = {};

var INITIAL_DB = {
  user: data.user,
  items: fn.reduce(function(acc, item) {
    acc[item.id] = item;
    return acc;
  }, {}, data.items)
};

// Fake HTTP request delay, in milliseconds
backend.DELAY = 1000;

// All the data in memory in a Mori hash map
backend._db = mori.js_to_clj(INITIAL_DB);

backend.init = function() {
  var saved = window.localStorage.getItem('db');
  if (saved) {
    this._db = mori.js_to_clj(JSON.parse(saved));
  }
};

backend.reset = function() {
  this._db = mori.js_to_clj(INITIAL_DB);
  window.localStorage.removeItem('db');
};

backend._persist = function() {
  window.localStorage.setItem('db', this._serialize());
};

backend._serialize = function() {
  return JSON.stringify(mori.clj_to_js(backend._db));
};

backend._send = function(status, body) {
  // Allow only 1 argument
  if (typeof body === 'undefined') {
    body = status;
    status = 200;
  }
  var deferred = Promise.defer();
  setTimeout(function() {
    deferred.resolve({
      status: status,
      body: mori.clj_to_js(body)
    });
  }, this.DELAY);
  return deferred.promise;
};

backend._error = function(status, body) {
  // Allow only 1 argument
  if (typeof body === 'undefined') {
    body = status;
    status = 500;
  }
  return this._send(status, body);
}

backend._isValidToken = function(token) {
  return token === 'abc123';
};

backend._badToken = function() {
  debug('_badToken');
  return this._error(401, mori.mash_map(
    'name', 'InvalidToken',
    'message', 'Auth token is invalid'
  ));
};

backend._notFound = function() {
  debug('_notFound');
  return this._error(404, mori.mash_map(
    'name', 'NotFound',
    'message', 'Resource not found'
  ));
};

// '/item/123' -> ['item', '123']
backend._resourceToKeys = function(resource) {
  var keys = resource.split('/').slice(1);
  return mori.js_to_clj(keys);
};

backend.get = function(resource, token) {
  if (!this._isValidToken(token)){
    return this._badToken();
  }

  var keys = this._resourceToKeys(resource);
  var data = mori.js_to_clj(data);

  if (mori.equals(mori.vector('user'), keys)) {
    return this._getUser();
  }

  return this._notFound();
};

backend.post = function(resource, token, data) {
  var keys = this._resourceToKeys(resource);
  var data = mori.js_to_clj(data);

  if (mori.equals(mori.vector('login'), keys)) {
    return this._login(data);
  }

  if (!this._isValidToken(token)){
    return this._badToken();
  }

  if (mori.equals(mori.vector('logout'), keys)) {
    return this._logout();
  }

  return this._notFound();
};

backend.put = function(resource, token, data) {
  if (!this._isValidToken(token)){
    return this._badToken();
  }

  var keys = this._resourceToKeys(resource);
  var data = mori.js_to_clj(data);

  if (mori.equals(mori.vector('user'), keys)) {
    return this._updateUser(data);
  }

  return this._notFound();
};

backend.delete = function(resource, token) {
  // Not implemented
  return this._notFound();
};

// User
// ==============================================

backend._login = function(credentials) {
  debug('_login');
  var username = mori.get(credentials, 'username');
  var password = mori.get(credentials, 'password');

  if (username === 'demo' && password === 'demo') {
    var result = mori.hash_map(
      'token', 'abc123',
      'user', mori.get(this._db, 'user')
    );
    return this._send(result);
  }

  return this._error(401, mori.hash_map(
    'name', 'InvalidCredentials',
    'message', 'Wrong username or password'
  ));
};

backend._logout = function() {
  debug('_logout');
  return this._send();
};

backend._getUser = function() {
  debug('_getUser');
  var user = mori.get(this._db, 'user');
  return this._send(user);
};

backend._updateUser = function(attributes) {
  debug('_updateUser');
  var user = mori.get(this._db, 'user');
  user = mori.merge(user, attributes);
  this._db = mori.assoc(this._db, 'user', user);
  this._persist();
  return this._send(user);
};

module.exports = backend;
