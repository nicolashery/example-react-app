var Fluxy = require('fluxy');

var RouterConstants = Fluxy.createConstants({
  messages: [
    'ROUTE_CHANGE',
    'REDIRECT_AFTER_LOGIN',
    'REDIRECT_AFTER_LOGOUT'
  ]
});

module.exports = RouterConstants;
