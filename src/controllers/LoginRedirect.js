var React = require('react');
var $ = require('fluxy').$;
var RouterStore = require('../router/RouterStore');

var debug = require('bows')('LoginRedirect');

var LoginRedirect = React.createClass({
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
    return !$.equals(state.redirectUri, nextState.redirectUri);
  },

  handleRouterStoreChange: function(keys, oldState, newState) {
    // Don't trigger a re-render on route change
    // or it will error trying to update an unmounted component
    if (keys !== 'redirectUri') {
      return;
    }
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
