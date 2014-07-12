var Params = require('./Params');
var Query = require('./Query');

var Route = {};

Route.toUri = function(route) {
  var uri = Route._injectParams(route);

  var query = route.query;
  if (query) {
    uri = uri + '?' + Query.stringify(query);
  }

  return uri;
};

Route._injectParams = function(route) {
  var path = route.path;
  if (!path) {
    throw Error('Can\'t build URI pattern from route without a "path" property');
  }
  var params = route.params || {};
  return Params.injectIntoPath(path, params);
};

Route.fromMatchedUri = function(matcher, uri) {
  var pattern = Query.uriWithoutQueryString(uri);
  var params = Params.fromMatchedPattern(matcher, pattern);
  var query = Query.fromUri(uri);

  var route = {path: matcher.path};
  if (params) {
    route.params = params;
  }
  if (query) {
    route.query = query;
  }

  return route;
};

module.exports = Route;
