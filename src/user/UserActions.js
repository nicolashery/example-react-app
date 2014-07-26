var Fluxy = require('fluxy');
var UserConstants = require('./UserConstants');
var UserService = require('./UserService');

module.exports = Fluxy.createActions({
  login: function (username, password) {
    var self = this;
    self.dispatchAction(UserConstants.LOGIN, {username: username});

    UserService.login(username, password)
      .then(function (result) {
        self.dispatchAction(UserConstants.LOGIN_SUCCESS, {
          token: result.token,
          user: result.user
        });
      })
      .catch(function (err) {
        self.dispatchAction(UserConstants.LOGIN_FAIL, {error: err});
      });
  },

  logout: function (token) {
    var self = this;
    self.dispatchAction(UserConstants.LOGOUT, {token: token});

    UserService.logout(token)
      .then(function (result) {
        self.dispatchAction(UserConstants.LOGOUT_SUCCESS);
      })
      .catch(function (err) {
        self.dispatchAction(UserConstants.LOGOUT_FAIL, {error: err});
      });
  },

  update: function(token, attributes) {
    var self = this;
    self.dispatchAction(UserConstants.USER_UPDATE);

    UserService.update(token, attributes)
      .then(function (result) {
        self.dispatchAction(UserConstants.USER_UPDATE_SUCCESS, {
          user: result.user
        });
      })
      .catch(function (err) {
        self.dispatchAction(UserConstants.USER_UPDATE_FAIL, {error: err});
      });
  }
});
