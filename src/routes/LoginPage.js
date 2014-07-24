var React = require('react');
var Layout = require('../layouts/DefaultLayout');
var NavBar = require('./NavBar');
var LoginRedirect = require('../controllers/LoginRedirect');
var LoginForm = require('../controllers/LoginForm');

var LoginPage = React.createClass({
  path: '/login',

  render: function() {
    return <Layout
      header={this.renderNavBar()}
      title='Login'
      content={this.renderContent()}
    />;
  },

  renderNavBar: function() {
    return <NavBar activePath={this.path} />;
  },

  renderContent: function() {
    return (
      <div>
        <LoginRedirect />
        <LoginForm />
      </div>
    );
  }
});

module.exports = LoginPage;
