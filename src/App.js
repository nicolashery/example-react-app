var React = require('react');
var UserStore = require('./user/UserStore');
var RouterStore = require('./router/RouterStore');
var RouterService = require('./router/RouterService');
var RouterActions = require('./router/RouterActions');
var LoginPage = require('./pages/LoginPage');
var AccountPage = require('./pages/AccountPage');
var NotFoundPage = require('./pages/NotFoundPage');
var NavLink = require('./components/NavLink');
var Logout = require('./components/Logout');

// NOTE: Should this glue code belong here?
RouterService.setup({
  paths: [
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
    RouterActions.navigateTo(route);
  }
});


var App = React.createClass({
  getInitialState: function() {
    return {
      route: RouterStore.get('route')
    };
  },

  componentWillMount: function () {
    RouterStore.on('changed:route', this.handleRouteChange);
  },

  componentWillUnmount: function () {
    RouterStore.removeListener('changed:route', this.handleRouteChange);
  },

  handleRouteChange: function() {
    this.setState({
      route: RouterStore.get('route')
    });
  },

  render: function() {
    var path = this.state.route && this.state.route.path;

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
        <Logout />
      </p>
    );
  }
});

module.exports = App;
