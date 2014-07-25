var React = require('react');
var Layout = require('../layouts/DefaultLayout');
var nav = require('./nav');

var DashboardPage = React.createClass({
  render: function() {
    return <Layout
      header={this.renderNav()}
      title='Dashboard'
      content={this.renderContent()}
    />;
  },

  renderNav: function() {
    return nav(this.props.path);
  },

  renderContent: function() {
    return 'Dashboard';
  }
});

module.exports = DashboardPage;
