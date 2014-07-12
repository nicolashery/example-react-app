var helpers = require('./lib/helpers');
var router = require('./router');

var RouterService = {
  setup: function(options) {
    if (options.matchedPaths) {
      router.setMatchedPaths(options.matchedPaths);
    }

    if (options.noAuthPaths) {
      this.requiresAuth = function(route) {
        var isNoAuthRoute = helpers.reduce(function(match, noAuthPath) {
          if (match) {
            return match;
          }
          return route.path === noAuthPath;
        }, false, options.noAuthPaths);
        return !isNoAuthRoute;
      };
    }

    if (options.defaultAuthPath) {
      this.defaultAuthRoute = function() {
        return {path: options.defaultAuthPath};
      };
    }

    if (options.defaultNoAuthPath) {
      this.defaultNoAuthRoute = function() {
        return {path: options.defaultNoAuthPath};
      };
    }

    if (options.notFoundPath) {
      this.notFoundRoute = function() {
        return {path: options.notFoundPath};
      };
    }

    if (options.onChange) {
      router.setOnChangeHandler(options.onChange);
    }
  },

  start: function() {
    router.start();
  },

  requiresAuth: function(route) {
    return false;
  },

  defaultAuthRoute: function() {
    return {path: '/dashboard'};
  },

  defaultNoAuthRoute: function() {
    return {path: '/login'};
  },

  notFoundRoute: function() {
    return {path: '/404'};
  },

  isRouteMatched: function(route) {
    return router.isRouteMatched(route);
  },

  updateBrowserUri: function(route, options) {
    router.updateBrowserUri(route, options);
  },

  uriFromRoute: function(route) {
    return router.uriFromRoute(route);
  }
};

module.exports = RouterService;
