var mori = require('fluxy').$;
var Promise = require('bluebird');

// Mock backend to persist data
// uses browser's localStorage
var storage = {};

var INITIAL_DB = {
  user: {
    id: '123',
    username: 'demo',
    fullName: 'Mary Smith'
  }
};

// Fake HTTP request delay, in milliseconds
storage.DELAY = 1000;

// All the data in memory in a Mori hash map
storage._db = mori.js_to_clj(INITIAL_DB);

storage.load = function() {
  var saved = window.localStorage.getItem('db');
  if (saved) {
    this._db = mori.js_to_clj(JSON.parse(saved));
  }
};

storage.clear = function() {
  this._db = mori.js_to_clj(INITIAL_DB);
  window.localStorage.removeItem('db');
};

storage._persist = function() {
  window.localStorage.setItem('db', this._serialize());
};

storage._serialize = function() {
  return JSON.stringify(mori.clj_to_js(storage._db));
};

storage._send = function(result, options) {
  options = options || {};
  var delay = typeof options.delay === 'undefined' ? this.DELAY : delay;
  var deferred = Promise.defer();
  setTimeout(function() {
    deferred.resolve(mori.clj_to_js(result));
  }, delay);
  return deferred.promise;
};

// '/lists/123' -> ['lists', '123']
storage._resourceToKeys = function(resource) {
  return resource.split('/').slice(1);
};

storage.get = function(resource, options) {
  var keys = this._resourceToKeys(resource);
  var res = mori.get_in(this._db, keys);
  return this._send(res, options);
};

storage.post = function(resource, data, options) {
  var keys = this._resourceToKeys(resource);
  var res = mori.js_to_clj(data);
  this._db = mori.assoc_in(this._db, keys, res);
  this._persist();
  return this._send(res, options);
};

storage.put = function(resource, data, options) {
  var keys = this._resourceToKeys(resource);
  var res = mori.js_to_clj(data);
  var existing = mori.get_in(this._db, keys);
  if (!existing) {
    this._db = mori.assoc_in(this._db, keys, res);
  }
  else {
    res = mori.merge(existing, res);
    this._db = mori.assoc_in(this._db, keys, res);
  }
  this._persist();
  return this._send(res, options);
};

storage.delete = function(resource, options) {
  var keys = this._resourceToKeys(resource);
  this._db = mori.dissoc_in(this._db, keys, res);
  this._persist();
  return this._send(null, options);
};

module.exports = storage;
