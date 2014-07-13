/*
The following `queryString`:

```
details=true&user[name]=bob
```

Gets parsed to produce the `query` object:

```javascript
{
  details: 'true',
  user: {name: 'bob'}
}
```

(And vice-versa, the above `query` object can be stringified to produce the
`queryString`.)

*/

var qs = require('qs');
var helpers = require('./helpers');

var Query = {};

Query._regexp = /\?(.+)/;

Query.stringify = function(query) {
  return qs.stringify(query);
};

Query.parse = function(queryString) {
  return qs.parse(queryString);
};

Query.uriWithoutQueryString = function(uri) {
  return uri.replace(Query._regexp, '');
};

Query.fromUri = function(uri) {
  var queryString = Query._queryStringFromUri(uri);
  if (!queryString) {
    return null;
  }
  return Query.parse(queryString);
};

Query._queryStringFromUri = function(uri) {
  var match = uri.match(Query._regexp);
  return match && match[1];
};

module.exports = Query;
