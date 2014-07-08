var UserService = require('./user/UserService');
var UserStore = require('./user/UserStore');

var init = function() {
  return UserService.init().then(function(result) {
    result = result || {};
    // Usually you never set store data directly (only through actions)
    // but making an exception here for the init method?
    UserStore.set('token', result.token);
    UserStore.set('user', result.user);
    return true;
  });
};

module.exports = init;
