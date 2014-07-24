var React = require('react');
var Layout = require('../layouts/DefaultLayout');
var NavBar = require('./NavBar');
var AccountForm = require('../controllers/AccountForm');

var LoginPage = React.createClass({
  path: '/account',

  render: function() {
    return <Layout
      header={this.renderNavBar()}
      title='Account'
      content={this.renderContent()}
    />;
  },

  renderNavBar: function() {
    return <NavBar activePath={this.path} />;
  },

  renderContent: function() {
    return (
      <AccountForm />
    );
  }
});

module.exports = LoginPage;
