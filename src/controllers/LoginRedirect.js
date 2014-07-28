var React = require('react');
var RouterStore = require('../router/RouterStore');

var debug = require('bows')('LoginRedirect');

var LoginRedirect = React.createClass({
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
    // Don't trigger a re-render on route change
    // or it will error trying to update an unmounted component
    if (keys !== 'redirectUri') {
      return;
    }

    debug('handleRouterStoreChange');
    this.setState(this.getRouterStoreState());
  },

  getRouterStoreState: function() {
    return {
      redirectUri: RouterStore.redirectAfterLoginUri()
    };
  },

  render: function() {
    debug('render');
    var uri = this.state.redirectUri;
    if (!uri) {
      return null;
    }

    return (
      <div className="alert alert-info">
        {'After logging in you will be redirected to '}
        <strong>{uri}</strong>
      </div>
    );
  }
});

module.exports = LoginRedirect;
