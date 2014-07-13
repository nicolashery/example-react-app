/*
The following `params` object:

```javascript
{
  userId: '123',
  taskId: '456'
}
```

Gets injected into the `path`:

```
/user/:userId/task/:taskId
```

To produce the `pattern`:

```
/user/123/task/456
```

(And vice-versa, with the proper `matcher` object, the `params` will get
extracted from the above `pattern`.)

*/

var helpers = require('./helpers');
var browser = require('./browser');

var Params = {};

Params.injectIntoPath = function(path, params) {
  var pattern = path;
  var paramNames = helpers.properties(params);
  helpers.each(function(name) {
    pattern = pattern.replace(':' + name, browser.uriEncode(params[name]));
  }, paramNames);
  return pattern;
};

Params.fromMatchedPattern = function(matcher, pattern) {
  var values = matcher.regexp.exec(pattern);
  if (!values) {
    return null;
  }
  values = helpers.slice(values, 1);
  var params = helpers.reduce(function(acc, key, index) {
    acc[key.name] = browser.uriDecode(values[index]);
    return acc;
  }, {}, matcher.keys);
  if (!helpers.properties(params).length) {
    return null;
  }
  return params;
};

module.exports = Params;
