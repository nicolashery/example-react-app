var Fluxy = require('fluxy');

var TagConstants = Fluxy.createConstants({
  messages: [
    'TAGS_FETCH',
    'TAGS_FETCH_SUCCESS',
    'TAGS_FETCH_FAIL',

    'TAGS_CLEAR_REQUESTS'
  ]
});

module.exports = TagConstants;
