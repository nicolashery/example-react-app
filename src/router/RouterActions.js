var Flux = require('fluxy');
var RouterConstants = require('./RouterConstants');
var RouterService = require('./RouterService');
var UserStore = require('../user/UserStore');

window.RouterService = RouterService;
window.UserStore = UserStore;

module.exports = Flux.createActions({
  navigateTo: function (route) {
    var rejectedRoute = null;
    var path = route && route.path;

    var routeRequiresAuth = RouterService.requiresAuth(route);
    var userIsAuthenticated = UserStore.isAuthenticated();
    var routeFound = RouterService.matchRoute(route);
    var isDefaultRoute = (path === '/');

    if (!routeFound) {
      console.log('route not found, redirecting');
      rejectedRoute = route;
      route = RouterService.notFoundRoute();
    }
    else if (isDefaultRoute) {
      console.log('default route, redirecting');
      route = userIsAuthenticated ?
        RouterService.defaultAuthRoute() : RouterService.defaultNoAuthRoute();
    }
    else if (routeRequiresAuth && !userIsAuthenticated) {
      console.log('not logged in, redirecting');
      rejectedRoute = route;
      route = RouterService.defaultNoAuthRoute();
    }
    else if (!routeRequiresAuth && userIsAuthenticated) {
      console.log('already logged in, redirecting');
      rejectedRoute = route;
      route = RouterService.defaultAuthRoute();
    }

    RouterService.updateBrowserUri(route);
    this.dispatchAction(RouterConstants.ROUTE_CHANGE, {
      route: route,
      rejectedRoute: rejectedRoute
    });
  }
});
