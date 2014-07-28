var Fluxy = require('fluxy');
var $ = Fluxy.$;
var RouterConstants = require('./RouterConstants');
var RouterService = require('./RouterService');
var RouterActions = require('./RouterActions');
var UserConstants = require('../user/UserConstants');
var UserStore = require('../user/UserStore');

var debug = require('bows')('RouterStore');

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

  _navigateTo: function(route) {
    var path = route && route.path;
    debug('_navigateTo', route);

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
  },

  actions: [
    [RouterConstants.ROUTE_CHANGE,
    function(payload) {
      this._navigateTo(payload.route);
    }],

    [UserConstants.LOGIN_SUCCESS,
    {waitFor: [UserStore]},
    function() {
      var redirectAfterLogin = this.getAsJS('redirectAfterLogin');
      if (redirectAfterLogin) {
        debug('logged in, redirecting to previous route');
        this.set('redirectAfterLogin', null);
        return RouterActions.navigateTo(redirectAfterLogin);
      }

      this._navigateTo(RouterService.defaultAuthRoute());
    }],

    [UserConstants.LOGOUT_SUCCESS,
    {waitFor: [UserStore]},
    function() {
      this._navigateTo(RouterService.defaultNoAuthRoute());
    }]
  ]
});
