var React = require('react');
var fn = require('fn.js');
var $ = require('fluxy').$;
var UserStore = require('../user/UserStore');
var UserActions = require('../user/UserActions');
var NavLink = require('./NavLink');
var Link = require('../router/Link');

var debug = require('bows')('NavBar');

var NavBar = React.createClass({
  propTypes: {
    activePath: React.PropTypes.string,
    noAuthLinks: React.PropTypes.array,
    authLinks: React.PropTypes.array
  },

  getInitialState: function() {
    return this.getUserStoreState();
  },

  componentWillMount: function() {
    UserActions.clearRequests();
  },

  componentDidMount: function () {
    UserStore.addWatch(this.handleUserStoreChange);
  },

  componentWillUnmount: function () {
    UserStore.removeWatch(this.handleUserStoreChange);
    UserActions.clearRequests();
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    var props = this.props;
    var state = this.state;
    return !(
      props.activePath === nextProps.activePath &&
      // Note: not checking for `noAuthLinks` & `authLinks`
      // as they are only defined once
      $.equals(state.isAuthenticated, nextState.isAuthenticated) &&
      $.equals(state.user, nextState.user) &&
      $.equals(state.loggingOut, nextState.loggingOut)
    );
  },

  handleUserStoreChange: function(keys) {
    this.setState(this.getUserStoreState());
  },

  getUserStoreState: function() {
    return {
      isAuthenticated: UserStore.isAuthenticated(),
      user: UserStore.loggedInUser(),
      loggingOut: UserStore.isLoggingOut()
    };
  },

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
      <div>
        {this.renderBrand()}
        <ul className="nav navbar-nav">
          {links}
        </ul>
      </div>
    );
  },

  renderWhenAuthenticated: function() {
    var links = this.renderLinks(this.props.authLinks);
    return (
      <div>
        {this.renderBrand()}
        <ul className="nav navbar-nav">
          {links}
        </ul>
        <ul className="nav navbar-nav navbar-right">
          {this.renderLoggedInAs()}
          {this.renderLogout()}
        </ul>
      </div>
    );
  },

  renderBrand: function() {
    return <Link className="navbar-brand" path="/">React App</Link>;
  },

  renderLinks: function(links) {
    var self = this;
    return fn.map(function(link) {
      var path = link.path;
      return (
        <NavLink
          key={path}
          active={self.props.activePath === path}
          path={path}>
          {link.label}
        </NavLink>
      );
    }, links);
  },

  renderLoggedInAs: function() {
    return (
      <li>
        <p className="navbar-text">
          {'Logged in as '}
          {this.renderUserDisplayName()}
        </p>
      </li>
    );
  },

  renderUserDisplayName: function() {
    var fullName = $.get(this.state.user, 'fullName', 'Anonymous');
    return <strong>{fullName}</strong>;
  },

  renderLogout: function() {
    if (this.state.loggingOut) {
      return (
        <li>
          <p className="navbar-text">Logging out...</p>
        </li>
      );
    }

    return (
      <li>
        <a href="#" onClick={this.handleLogout}>Logout</a>
      </li>
    );
  },

  handleLogout: function(e) {
    debug('handleLogout');
    e.preventDefault();
    UserActions.logout(UserStore.token());
  }
});

module.exports = NavBar;
