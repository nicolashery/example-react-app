var React = require('react');
var $ = require('fluxy').$;
var RouterStore = require('./router/RouterStore');
var routingTable = require('./routes/table');

require('./App.less');

var debug = require('bows')('App');

var App = React.createClass({
  getInitialState: function() {
    return this.getRouterStoreState();
  },

  componentDidMount: function () {
    RouterStore.addWatch(this.handleRouterStoreChange);
  },

  componentWillUnmount: function () {
    RouterStore.removeWatch(this.handleRouterStoreChange);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    var state = this.state;
    return !$.equals(state.route, nextState.route);
  },

  handleRouterStoreChange: function(keys, oldState, newState) {
    if (keys !== 'route') {
      return;
    }
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
