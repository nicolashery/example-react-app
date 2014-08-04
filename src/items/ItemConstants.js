var Fluxy = require('fluxy');

var ItemConstants = Fluxy.createConstants({
  messages: [
    'ITEMS_FETCH',
    'ITEMS_FETCH_SUCCESS',
    'ITEMS_FETCH_FAIL'
  ]
});

module.exports = ItemConstants;
