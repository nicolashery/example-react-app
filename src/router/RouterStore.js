var Flux = require('fluxy');
var RouterConstants = require('./RouterConstants');
var RouterService = require('./RouterService');
var RouterActions = require('./RouterActions');
var UserStore = require('../user/UserStore');

module.exports = Flux.createStore({
  getInitialState: function() {
    return {
      route: null,
      redirectAfterLogin: null
    };
  },

  actions: {
    handleRouteChange: [
      RouterConstants.ROUTE_CHANGE,
      // NOTE: this waitFor throws an error when starting Flux
      // things work without it though, so might not be necessary
      // {waitFor: [UserStore]},
      function(payload) {
        var route = payload.route;
        var path = route && route.path;
        console.log('routerstore', route);

        var routeFound = route && RouterService.isRouteMatched(route);
        var isDefaultRoute = (path === '/');
        var routeRequiresAuth = route && RouterService.requiresAuth(route);
        var userIsAuthenticated = UserStore.isAuthenticated();

        if (!routeFound) {
          console.log('route not found, redirecting');
          route = RouterService.notFoundRoute();
        }
        else if (isDefaultRoute) {
          console.log('default route, redirecting');
          route = userIsAuthenticated ?
            RouterService.defaultAuthRoute() : RouterService.defaultNoAuthRoute();
        }
        else if (routeRequiresAuth && !userIsAuthenticated) {
          console.log('not logged in, redirecting');
          this.set('redirectAfterLogin', route);
          route = RouterService.defaultNoAuthRoute();
        }
        else if (!routeRequiresAuth && userIsAuthenticated) {
          console.log('already logged in, redirecting');
          route = RouterService.defaultAuthRoute();
        }

        RouterService.updateBrowserUri(route);

        this.set('route', route);
      }
    ],

    handleRedirectAfterLogin: [
      RouterConstants.REDIRECT_AFTER_LOGIN,
      // {waitFor: [UserStore]},
      function() {
        var redirectAfterLogin = this.get('redirectAfterLogin');
        if (redirectAfterLogin) {
          console.log('logged in, redirecting to previous route');
          this.set('redirectAfterLogin', null);
          return RouterActions.navigateTo(redirectAfterLogin);
        }

        RouterActions.navigateTo(RouterService.defaultAuthRoute());
      }
    ],

    handleRedirectAfterLogout: [
      RouterConstants.REDIRECT_AFTER_LOGOUT,
      // {waitFor: [UserStore]},
      function() {
        RouterActions.navigateTo(RouterService.defaultNoAuthRoute());
      }
    ]
  },

  redirectAfterLoginUri: function() {
    var route = this.get('redirectAfterLogin');
    if (!route) {
      return null;
    }
    return RouterService.uriFromRoute(route);
  }
});
