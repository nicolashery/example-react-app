var React = require('react');
var $ = require('fluxy').$;
var assign = require('lodash-node/modern/objects/assign');
var UserStore = require('./user/UserStore');
var UserActions = require('./user/UserActions');
var RouterStore = require('./router/RouterStore');
var RouterService = require('./router/RouterService');
var RouterActions = require('./router/RouterActions');
var LoginPage = require('./pages/LoginPage');
var AccountPage = require('./pages/AccountPage');
var NotFoundPage = require('./pages/NotFoundPage');
var NavLink = require('./components/NavLink');

var debug = require('debug')('app:App');

// NOTE: Should this glue code belong here?
RouterService.setup({
  matchedPaths: [
    '/',
    '/login',
    '/about',
    '/dashboard',
    '/account',
    '/404'
  ],
  noAuthPaths: ['/login', '/about'],
  defaultAuthPath: '/dashboard',
  defaultNoAuthPath: '/login',
  notFoundPath: '/404',
  onChange: function(uri, route) {
    debug('uri change', uri);
    RouterActions.navigateTo(route);
  }
});

var App = React.createClass({
  getInitialState: function() {
    return assign(this.getUserStoreState(), this.getRouterStoreState());
  },

  componentWillMount: function () {
    debug('mount');
    UserStore.addWatch(this.handleUserStoreChange);
    RouterStore.addWatch(this.handleRouterStoreChange);
  },

  componentWillUnmount: function () {
    debug('unmount');
    UserStore.removeWatch(this.handleUserStoreChange);
    RouterStore.removeWatch(this.handleRouterStoreChange);
  },

  handleUserStoreChange: function() {
    debug('handleUserStoreChange');
    this.setState(this.getUserStoreState());
  },

  getUserStoreState: function() {
    return {
      loggingOut: UserStore.get('loggingOut')
    };
  },

  handleRouterStoreChange: function() {
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

    return (
      <div>
        {this.renderHeader(path)}
        {this.renderContent(path)}
      </div>
    );
  },

  renderContent: function(path) {
    if (path === '/404') {
      return <NotFoundPage />
    }

    if (path === '/login') {
      return <LoginPage />;
    }
    if (path === '/about') {
      return 'About';
    }

    if (path === '/dashboard') {
      return 'Dashboard';
    }
    if (path === '/account') {
      return <AccountPage />;
    }

    return null;
  },

  renderHeader: function(path) {
    if (path === '/login' || path === '/about') {
      return (
        <p>
          <NavLink active={path === '/login'} path='/login'>Login</NavLink>{' · '}
          <NavLink active={path === '/about'} path='/about'>About</NavLink>
        </p>
      );
    }

    return (
      <p>
        <NavLink active={path === '/dashboard'} path='/dashboard'>Dashboard</NavLink>{' · '}
        <NavLink active={path === '/account'} path='/account'>Account</NavLink>{' · '}
        {this.renderLogout()}
      </p>
    );
  },

  renderLogout: function() {
    if (this.state.loggingOut) {
      return <span>Logging out...</span>;
    }

    return <a href="#" onClick={this.handleLogout}>Logout</a>;
  },

  handleLogout: function(e) {
    debug('handleLogout');
    e.preventDefault();
    UserActions.logout(UserStore.get('token'));
  }
});

module.exports = App;
