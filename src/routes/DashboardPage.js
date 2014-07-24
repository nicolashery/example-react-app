var React = require('react');
var Layout = require('../layouts/DefaultLayout');
var NavBar = require('./NavBar');

var DashboardPage = React.createClass({
  path: '/dashboard',

  render: function() {
    return <Layout
      header={this.renderNavBar()}
      title='Dashboard'
      content={this.renderContent()}
    />;
  },

  renderNavBar: function() {
    return <NavBar activePath={this.path} />;
  },

  renderContent: function() {
    return 'Dashboard';
  }
});

module.exports = DashboardPage;
