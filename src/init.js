var $ = require('fluxy').$;
var backend = require('./mock/backend');
var UserService = require('./user/UserService');
var UserStore = require('./user/UserStore');

var debug = require('bows')('init');

var init = function() {
  backend.init();

  return UserService.init().then(function(result) {
    result = result || {};
    // Usually you never set store data directly (only through actions)
    // but making an exception here for the init method?
    UserStore.set('token', result.token);
    UserStore.setFromJS('user', result.user);
    debug('complete');
    return true;
  });
};

module.exports = init;
