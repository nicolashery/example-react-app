var Fluxy = require('fluxy');

var UserConstants = Fluxy.createConstants({
  messages: [
    'LOGIN',
    'LOGIN_SUCCESS',
    'LOGIN_FAIL',

    'LOGOUT',
    'LOGOUT_SUCCESS',
    'LOGOUT_FAIL',

    'USER_UPDATE',
    'USER_UPDATE_SUCCESS',
    'USER_UPDATE_FAIL',

    'USER_CLEAR_REQUESTS'
  ]
});

module.exports = UserConstants;
