var React = require('react');
var $ = require('fluxy').$;
var RouterStore = require('./router/RouterStore');
var routingTable = require('./routes/table');

var debug = require('debug')('app:App');

var App = React.createClass({
  getInitialState: function() {
    return this.getRouterStoreState();
  },

  componentDidMount: function () {
    debug('componentDidMount');
    RouterStore.addWatch(this.handleRouterStoreChange);
  },

  componentWillUnmount: function () {
    debug('componentWillUnmount');
    RouterStore.removeWatch(this.handleRouterStoreChange);
  },

  handleRouterStoreChange: function(keys, oldState, newState) {
    if (keys !== 'route') {
      return;
    }
    debug('handleRouterStoreChange');
    this.setState(this.getRouterStoreState());
  },

  getRouterStoreState: function() {
    return {
      route: RouterStore.get('route')
    };
  },

  render: function() {
    debug('render');
    var path = $.get(this.state.route, 'path');
    var ActiveRoute = routingTable[path];

    if (!ActiveRoute) {
      return null;
    }

    return <ActiveRoute path={path} />;
  }
});

module.exports = App;
