var React = require('react');
var NavLink = require('../controllers/NavLink');
var LoggedInAs = require('../controllers/LoggedInAs');

var NavBar = React.createClass({
  propTypes: {
    activePath: React.PropTypes.string
  },

  render: function() {
    var path = this.props.activePath;

    if (!path) {
      return null;
    }

    if (path === '/login' || path === '/about') {
      return this.renderWhenNotAuthenticated(path);
    }

    return this.renderWhenAuthenticated(path);
  },

  renderWhenNotAuthenticated: function(path) {
    return (
      <p>
        <NavLink active={path === '/login'} path='/login'>Login</NavLink>{' · '}
        <NavLink active={path === '/about'} path='/about'>About</NavLink>
      </p>
    );
  },

  renderWhenAuthenticated: function(path) {
    return (
      <p>
        <NavLink active={path === '/dashboard'} path='/dashboard'>Dashboard</NavLink>{' · '}
        <NavLink active={path === '/account'} path='/account'>Account</NavLink>{' · '}
        <LoggedInAs />
      </p>
    );
  }
});

module.exports = NavBar;
