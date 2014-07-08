var React = require('react');
var Flux = require('fluxy');
var App = require('./App');
var init = require('./init');

// For React developer tools
window.React = React;

Flux.start();

init().then(function() {
  // Start router after loading local session
  // to redirect if authenticated or not
  RouterService.start();
  React.renderComponent(<App />, document.body);
});
