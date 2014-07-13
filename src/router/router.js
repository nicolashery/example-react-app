/*
An example router built with the `router.lib` components. Can be used as-is,
or serve as inspiration to build your own.

Set the paths you want the router to match URIs with:

```javascript
router.setMatchedPaths([
  '/items',
  '/item/:id',
  '/404'
]);
```

Set the handler you want to be called when the browser's URI changes with:

```javascript
var currentRoute;
router.setOnChangeHandler(function(uri, route) {
  if (!route) {
    // URI was not matched
    route = {path: '/404'};
  }
  currentRoute = route;
});
```

You can also update the browser URI programmatically (will not fire the on
URI change handler). Example:

```javascript
function navigateTo(route) {
  if (!router.isMatched(route)) {
    return navigateTo({path: '/404'});
  }
  currentRoute = route;
  router.updateBrowserUri(route);
}
```

Start the router to listen to browser URI changes:

```javascript
router.start();
```

*/

var helpers = require('./lib/helpers');
var browser = require('./lib/browser');
var Route = require('./lib/Route');
var Matcher = require('./lib/Matcher');
var Params = require('./lib/Params');
var Query = require('./lib/Query');

var router = {
  _matcher: [],
  _onChangeHandler: function() {},

  setMatchedPaths: function(paths) {
    this._matchers = Matcher.fromPaths(paths);
    return this;
  },

  setOnChangeHandler: function(handler) {
    this._onChangeHandler = handler;
    return this;
  },

  start: function() {
    this._addEventListeners();
    this._onUriChange();
  },

  isRouteMatched: function(route) {
    if (!route) {
      return false;
    }
    var path = route.path;
    return Boolean(Matcher.matchWithPath(this._matchers, path));
  },

  _skipNextOnChangeHandler: false,

  updateBrowserUri: function(route, options) {
    options = options || {};
    var uri = this.uriFromRoute(route);
    this._skipNextOnChangeHandler = true;

    if (options.replace) {
      browser.replaceUri(uri);
    }
    else {
      browser.setUri(uri);
    }
  },

  uriFromRoute: function(route) {
    return Route.toUri(route);
  },

  _addEventListeners: function() {
    browser.on('hashchange', this._onUriChange, this);
  },

  _onUriChange: function() {
    if (this._skipNextOnChangeHandler) {
      this._skipNextOnChangeHandler = false;
      return;
    }

    var uri = browser.getCurrentUri();

    if (!(uri && uri.length)) {
      uri = '/';
      browser.replaceUri(uri);
      return;
    }

    var route = null;
    var pattern = Query.uriWithoutQueryString(uri);
    var matcher = Matcher.matchWithRegexp(this._matchers, pattern);
    if (matcher) {
      route = Route.fromMatchedUri(matcher, uri);
    }

    this._onChangeHandler(uri, route);
  },

  lib: {
    helpers: helpers,
    browser: browser,
    Route: Route,
    Matcher: Matcher,
    Params: Params,
    Query: Query
  }
};

module.exports = router;
