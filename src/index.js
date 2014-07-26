var React = require('react');
var Fluxy = require('fluxy');
var fn = require('fn.js');
var App = require('./App');
var init = require('./init');
var RouterService = require('./router/RouterService');
var RouterActions = require('./router/RouterActions');

var debug = require('debug')('app');

// For React developer tools
window.React = React;

// Glue-code to setup routing
RouterService.setup(fn.merge(require('./routes/setup'), {
  onChange: function(uri, route) {
    debug('uri change', uri);
    RouterActions.navigateTo(route);
  }
}));

Fluxy.start();

init().then(function() {
  // Start router after loading local session
  // to redirect if authenticated or not
  RouterService.start();
  window.app = React.renderComponent(<App />, document.body);
  debug('started');

  window.$debug = require('debug');
  window.mori = require('fluxy').$;
  app.storage = require('./storage');
  app.RouterStore = require('./router/RouterStore');
  app.UserStore = require('./user/UserStore');
});
