var Flux = require('fluxy');
var RouterConstants = require('./RouterConstants');
var RouterService = require('./RouterService');

module.exports = Flux.createStore({
  getInitialState: function() {
    return {
      route: null,
      rejectedRoute: null
    };
  },

  actions: {
    handleRouteChange: [RouterConstants.ROUTE_CHANGE, function(payload) {
      var route = payload.route;
      var rejectedRoute = payload.rejectedRoute;
      this.set('rejectedRoute', rejectedRoute);
      this.set('route', route);
    }]
  },

  rejectedUri: function() {
    return RouterService._serializeRoute(this.get('rejectedRoute'));
  }
});
