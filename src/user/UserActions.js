var Flux = require('fluxy');
var UserConstants = require('./UserConstants');
var UserService = require('./UserService');

module.exports = Flux.createActions({
  login: function (username, password) {
    var self = this;
    self.dispatchAction(UserConstants.LOGIN, {username: username});

    UserService.login(username, password)
      .then(function (result) {
        self.dispatchAction(UserConstants.LOGIN_SUCCESS, {
          token: result.token,
          user: result.user
        });
      }.bind(this))
      .catch(function (err) {
        self.dispatchAction(UserConstants.LOGIN_FAIL, {error: err});
      }.bind(this));
  },

  logout: function (token) {
    var self = this;
    self.dispatchAction(UserConstants.LOGOUT, {token: token});

    UserService.logout(token)
      .then(function (result) {
        self.dispatchAction(UserConstants.LOGOUT_SUCCESS);
      }.bind(this))
      .catch(function (err) {
        self.dispatchAction(UserConstants.LOGOUT_FAIL, {error: err});
      }.bind(this));
  }
});
