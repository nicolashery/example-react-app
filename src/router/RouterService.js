var fn = require('fn.js');
var regexpFromPath = require('path-to-regexp');
var qs = require('qs');

var slice = Array.prototype.slice;

var bind = function (func, context) {
  return function () {
    func.apply(context, Array.prototype.slice.call(arguments));
  };
};

var addEvent = function (host, eventName, handler, context) {
  host.addEventListener(eventName, bind(handler, context), false);
};

function uriEncode(str) {
  return encodeURIComponent(str);
}

function uriDecode(str) {
  return decodeURIComponent(str);
}

var queryMatcher = /\?(.+)/;

var RouterService = {
  _matchers: [],

  setup: function(options) {
    if (options.paths) {
      this._matchers = this._matchersFromPaths(options.paths);
    }

    if (options.noAuthPaths) {
      this.requiresAuth = function(route) {
        var isNoAuthRoute = fn.reduce(function(match, noAuthPath) {
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
      this.onChange = options.onChange;
    }
  },

  start: function() {
    this._addEventListeners();
    this._onUriChange();
  },

  onChange: function(uri, route) {},

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
    if (!route) {
      return false;
    }
    return Boolean(this._matchRoute(this._matchers, route));
  },

  redirectAfterLogin: null,

  _skipNextOnChangeHandler: false,

  updateBrowserUri: function(route, options) {
    options = options || {};
    var uri = this._uriFromRoute(route);
    this._skipNextOnChangeHandler = true;

    if (options.replace) {
      location.replace('#' + uri);
    }
    else {
      location.hash = uri
    }
  },

  _addEventListeners: function() {
    addEvent(window, 'hashchange', this._onUriChange, this);
  },

  _onUriChange: function() {
    if (this._skipNextOnChangeHandler) {
      this._skipNextOnChangeHandler = false;
      return;
    }

    var uri = this._getCurrentUri();
    console.log('on uri change', uri);

    if (!(uri && uri.length)) {
      uri = '/';
      location.replace('#' + uri);
      return;
    }

    var route = null;
    var matcher = this._matchUri(this._matchers, uri);
    if (matcher) {
      route = this._routeFromUri(matcher, uri);
    }

    this.onChange(uri, route);
  },

  _getCurrentUri: function () {
    return location.hash.replace('#', '');
  },

  // lib
  // ======================================================================

  _uriFromRoute: function(route) {
    var uri = this._patternFromRoute(route);

    var queryString = this._queryStringFromRoute(route);
    if (queryString) {
      uri = uri + '?' + queryString;
    }

    return uri;
  },

  _patternFromRoute: function(route) {
    var path = route.path;
    if (!path) {
      throw Error('Can\'t build URI pattern from route without a "path" property');
    }
    var uri = path;
    var params = route.params || {};
    var paramNames = fn.properties(params);
    fn.each(function(name) {
      uri = uri.replace(':' + name, uriEncode(params[name]));
    }, paramNames);
    return uri;
  },

  _queryStringFromRoute: function(route) {
    var query = route.query || {};
    if (!fn.properties(query).length) {
      return null;
    }
    return this._queryStringFromQuery(query);
  },

  _queryStringFromQuery: function(query) {
    return qs.stringify(query);
  },

  _matchersFromPaths: function(paths) {
    return fn.map(this._matcherFromPath, paths);
  },

  _matcherFromPath: function(path) {
    var keys = [];
    var regexp = regexpFromPath(path, keys);
    return {
      path: path,
      regexp: regexp,
      keys: keys
    };
  },

  _matchPattern: function(matchers, pattern) {
    return fn.reduce(function(match, matcher) {
      if (match) {
        return match;
      }
      var regexp = matcher.regexp;
      if (regexp.test(pattern)) {
        return matcher;
      }
      return null;
    }, null, matchers);
  },

  _matchUri: function(matchers, uri) {
    var pattern = this._uriWithoutQueryString(uri);
    return this._matchPattern(matchers, pattern);
  },

  _matchPath: function(matchers, path) {
    return fn.reduce(function(match, matcher) {
      if (match) {
        return match;
      }
      if (matcher.path === path) {
        return matcher;
      }
      return null;
    }, null, matchers);
  },

  _matchRoute: function(matchers, route) {
    var path = route && route.path;
    return this._matchPath(matchers, path);
  },

  _uriWithoutQueryString: function(uri) {
    return uri.replace(queryMatcher, '');
  },

  _queryFromUri: function(uri) {
    var queryString = this._queryStringFromUri(uri);
    if (!queryString) {
      return null;
    }
    return this._queryFromQueryString(queryString);
  },

  _queryFromQueryString: function(queryString) {
    return qs.parse(queryString);
  },

  _queryStringFromUri: function(uri) {
    var match = uri.match(queryMatcher);
    return match && match[1];
  },

  _routeFromUri: function(matcher, uri) {
    var params = this._paramsFromUri(matcher, uri);
    var query = this._queryFromUri(uri);

    var route = {path: matcher.path};
    if (params) {
      route.params = params;
    }
    if (query) {
      route.query = query;
    }

    return route;
  },

  _paramsFromUri: function(matcher, uri) {
    var pattern = this._uriWithoutQueryString(uri);
    return this._paramsFromPattern(matcher, pattern);
  },

  _paramsFromPattern: function(matcher, pattern) {
    var values = matcher.regexp.exec(pattern);
    if (!values) {
      return null;
    }
    values = slice.call(values, 1);
    var params = fn.reduce(function(acc, key, index) {
      acc[key.name] = uriDecode(values[index]);
      return acc;
    }, {}, matcher.keys);
    if (!fn.properties(params).length) {
      return null;
    }
    return params;
  }
};

module.exports = RouterService;
