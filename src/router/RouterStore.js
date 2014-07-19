var Fluxy = require('fluxy');
var $ = Fluxy.$;
var RouterConstants = require('./RouterConstants');
var RouterService = require('./RouterService');
var RouterActions = require('./RouterActions');
var UserStore = require('../user/UserStore');

var debug = require('debug')('app:RouterStore');

module.exports = Fluxy.createStore({
  getInitialState: function() {
    return {
      route: null,
      redirectAfterLogin: null
    };
  },

  redirectAfterLoginUri: function() {
    var route = this.getAsJS('redirectAfterLogin');
    if (!route) {
      return null;
    }
    return RouterService.uriFromRoute(route);
  },

  actions: [
    [RouterConstants.ROUTE_CHANGE,
    // NOTE: this waitFor throws an error when starting Flux
    // things work without it though, so might not be necessary
    // {waitFor: [UserStore]},
    function(payload) {
      var route = payload.route;
      var path = route && route.path;
      debug('route change', route);

      var routeFound = route && RouterService.isRouteMatched(route);
      var isDefaultRoute = (path === '/');
      var routeRequiresAuth = route && RouterService.requiresAuth(route);
      var userIsAuthenticated = UserStore.isAuthenticated();

      if (!routeFound) {
        debug('route not found, redirecting');
        route = RouterService.notFoundRoute();
      }
      else if (isDefaultRoute) {
        debug('default route, redirecting');
        route = userIsAuthenticated ?
          RouterService.defaultAuthRoute() : RouterService.defaultNoAuthRoute();
      }
      else if (routeRequiresAuth && !userIsAuthenticated) {
        debug('not logged in, redirecting');
        this.set('redirectAfterLogin', $.js_to_clj(route));
        route = RouterService.defaultNoAuthRoute();
      }
      else if (!routeRequiresAuth && userIsAuthenticated) {
        debug('already logged in, redirecting');
        route = RouterService.defaultAuthRoute();
      }

      RouterService.updateBrowserUri(route);

      this.set('route', $.js_to_clj(route));
    }],

    [RouterConstants.REDIRECT_AFTER_LOGIN,
    // {waitFor: [UserStore]},
    function() {
      var redirectAfterLogin = this.getAsJS('redirectAfterLogin');
      if (redirectAfterLogin) {
        debug('logged in, redirecting to previous route');
        this.set('redirectAfterLogin', null);
        return RouterActions.navigateTo(redirectAfterLogin);
      }

      RouterActions.navigateTo(RouterService.defaultAuthRoute());
    }],

    [RouterConstants.REDIRECT_AFTER_LOGOUT,
    // {waitFor: [UserStore]},
    function() {
      RouterActions.navigateTo(RouterService.defaultNoAuthRoute());
    }]
  ]
});
