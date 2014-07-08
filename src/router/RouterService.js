var each = function (arr, iterator, context) {
  context = context || this;

  for (var i = 0, len = arr.length; i < len; i++) {
    iterator.call(context, arr[i], i);
  }
};

var isArray = function (o) {
  return Array.isArray(o);
};

var bind = function (func, context) {
  return function () {
    func.apply(context, Array.prototype.slice.call(arguments));
  };
};

var addEvent = function (host, eventName, handler, context) {
  host.addEventListener(eventName, bind(handler, context), false);
};

module.exports = {
  start: function() {
    this._addEventListeners();
    this._onUriChange();
  },

  // Override with own handler
  onRouteChange: function() {},

  requiresAuth: function(route) {
    var path = route.path;
    return path !== '/login' && path !== '/about';
  },

  defaultAuthRoute: function() {
    return {path: '/dashboard'};
  },

  defaultNoAuthRoute: function() {
    return {path: '/login'};
  },

  matchRoute: function(route) {
    var path = route.path;
    return (
      path === '/' ||
      path === '/login' ||
      path === '/about' ||
      path === '/dashboard' ||
      path === '/account' ||
      path === '/404'
    );
  },

  notFoundRoute: function() {
    return {path: '/404'};
  },

  updateBrowserUri: function(route, options) {
    options = options || {};
    var uri = this._serializeRoute(route);
    this._skipOnChangeHandler = true;

    if (options.replace) {
      location.replace('#' + uri);
    }
    else {
      location.hash = uri
    }
  },

  _skipOnChangeHandler: false,

  _serializeRoute: function(route) {
    if (!route) {
      return;
    }

    var uri = route.path;
    var params = route.params;
    var query = route.query;

    if (!uri) {
      throw Error('"path" is a required property of the "route" object');
    }

    if (params) {
      for (var p in params) {
        if (params.hasOwnProperty(p)) {
          uri = uri.replace(':' + p, encodeURIComponent(params[p]));
        }
      }
    }

    if (query) {
      uri += this._serializeQuery(query);
    }

    return uri;
  },

  _serializeQuery: function (query) {
    var queryString = [],
        val;

    for (var key in query) {
      if (query.hasOwnProperty(key)) {
        val = query[key];

        if (isArray(val)) {
          each(val, function (item) {
            queryString.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(item));
          });
        }
        else {
          queryString.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
        }
      }
    }

    queryString = '?' + queryString.join('&');

    return queryString;
  },

  _addEventListeners: function() {
    addEvent(window, 'hashchange', this._onUriChange, this);
  },

  _onUriChange: function() {
    if (this._skipOnChangeHandler) {
      this._skipOnChangeHandler = false;
      return;
    }

    var uri = this._getCurrentUri();
    console.log('on uri change', uri);

    if (!(uri && uri.length)) {
      uri = '/';
      location.replace('#' + uri);
      return;
    }

    var route = this._deserializeUri(uri);
    this.onRouteChange(route);
  },

  _getCurrentUri: function () {
    return location.hash.replace('#', '');
  },

  _deserializeUri: function(uri) {
    // TODO
    return {path: uri};
  }
};
