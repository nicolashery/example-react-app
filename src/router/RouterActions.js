var Fluxy = require('fluxy');
var RouterConstants = require('./RouterConstants');

module.exports = Fluxy.createActions({
  navigateTo: function (route) {
    this.dispatchAction(RouterConstants.ROUTE_CHANGE, {route: route});
  }
});
