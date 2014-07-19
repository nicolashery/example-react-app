var Fluxy = require('fluxy');

var UserConstants = Fluxy.createConstants({
  messages: [
    'LOGIN',
    'LOGIN_SUCCESS',
    'LOGIN_FAIL',

    'LOGOUT',
    'LOGOUT_SUCCESS',
    'LOGOUT_FAIL'
  ]
});

module.exports = UserConstants;
