var Flux = require('fluxy');
var RouterConstants = require('./RouterConstants');

module.exports = Flux.createActions({
  navigateTo: function (route) {
    this.dispatchAction(RouterConstants.ROUTE_CHANGE, {route: route});
  },

  redirectAfterLogin: function() {
    this.dispatchAction(RouterConstants.REDIRECT_AFTER_LOGIN);
  },

  redirectAfterLogout: function() {
    this.dispatchAction(RouterConstants.REDIRECT_AFTER_LOGOUT);
  }
});
