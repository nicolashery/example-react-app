/*
The following `path`:

```
/item/:id
```

Will produce the `matcher` object:

```javascript
{
  path: '/item/:id',
  regexp: /^\/item\/([^\\/]+?)(?:\/(?=$))?$/i,
  keys: [{name: 'id'}]
}
```

Which can be used to match a `pattern` (i.e. a `uri` without the query string):

```javascript
matchWithRegexp([matcher], '/item/123')
//-> returns the `matcher`
```

Or match the `path` itself:

```javascript
matchWithPath([matcher], '/item/:id')
//-> returns the `matcher`
```

*/

var regexpFromPath = require('path-to-regexp');
var helpers = require('./helpers');

var Matcher = {};

Matcher.fromPaths = function(paths) {
  return helpers.map(Matcher.fromPath, paths);
};

Matcher.fromPath = function(path) {
  var keys = [];
  var regexp = regexpFromPath(path, keys);
  return {
    path: path,
    regexp: regexp,
    keys: keys
  };
};

Matcher.matchWithRegexp = function(matchers, pattern) {
  return helpers.reduce(function(match, matcher) {
    if (match) {
      return match;
    }
    var regexp = matcher.regexp;
    if (regexp.test(pattern)) {
      return matcher;
    }
    return null;
  }, null, matchers);
};

Matcher.matchWithPath = function(matchers, path) {
  return helpers.reduce(function(match, matcher) {
    if (match) {
      return match;
    }
    if (matcher.path === path) {
      return matcher;
    }
    return null;
  }, null, matchers);
};

module.exports = Matcher;
