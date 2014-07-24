var React = require('react');
var Layout = require('../layouts/DefaultLayout');
var NavBar = require('./NavBar');

var NotFoundPage = React.createClass({
  path: '/about',

  render: function() {
    return <Layout
      header={this.renderNavBar()}
      title='About'
      content={this.renderContent()}
    />;
  },

  renderNavBar: function() {
    return <NavBar activePath={this.path} />;
  },

  renderContent: function() {
    return 'About';
  }
});

module.exports = NotFoundPage;
