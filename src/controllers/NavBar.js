var React = require('react');
var fn = require('fn.js');
var $ = require('fluxy').$;
var UserStore = require('../user/UserStore');
var UserActions = require('../user/UserActions');
var NavLink = require('./NavLink');

var debug = require('debug')('app:NavBar');

var NavBar = React.createClass({
  propTypes: {
    activePath: React.PropTypes.string,
    noAuthLinks: React.PropTypes.array,
    authLinks: React.PropTypes.array
  },

  getInitialState: function() {
    return this.getUserStoreState();
  },

  componentDidMount: function () {
    debug('componentDidMount');
    UserStore.addWatch(this.handleUserStoreChange);
  },

  componentWillUnmount: function () {
    debug('componentWillUnmount');
    UserStore.removeWatch(this.handleUserStoreChange);
  },

  handleUserStoreChange: function() {
    debug('handleUserStoreChange');
    this.setState(this.getUserStoreState());
  },

  getUserStoreState: function() {
    return {
      isAuthenticated: UserStore.isAuthenticated(),
      user: UserStore.loggedInUser(),
      loggingOut: UserStore.get('loggingOut')
    };
  },

  linkSeparator: ' · ',

  render: function() {
    debug('render');
    if (!this.props.activePath) {
      return null;
    }

    if (!this.state.isAuthenticated) {
      return this.renderWhenNotAuthenticated();
    }

    return this.renderWhenAuthenticated();
  },

  renderWhenNotAuthenticated: function() {
    var links = this.renderLinks(this.props.noAuthLinks);
    return (
      <p>
        {links}
      </p>
    );
  },

  renderWhenAuthenticated: function() {
    var links = this.renderLinks(this.props.authLinks);
    var sep = links.length ? this.linkSeparator : null;
    return (
      <p>
        {links}
        {sep}
        {this.renderLoggedInAs()}
      </p>
    );
  },

  renderLinks: function(links) {
    var self = this;
    var lastIndex = links && links.length - 1;
    return fn.map(function(link, index) {
      var path = link.path;
      var sep = index === lastIndex ? null : self.linkSeparator;
      return (
        <span key={path}>
          <NavLink
            active={self.props.activePath === path}
            path={path}>
            {link.label}
          </NavLink>
          {sep}
        </span>
      );
    }, links);
  },

  renderLoggedInAs: function() {
    return (
      <span>
        {'Logged in as '}
        {this.renderUserDisplayName()}
        {' '}
        {this.renderLogout()}
      </span>
    );
  },

  renderUserDisplayName: function() {
    var fullName = $.get(this.state.user, 'fullName', 'Anonymous');
    return <strong>{fullName}</strong>;
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

module.exports = NavBar;
