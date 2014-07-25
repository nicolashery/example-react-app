var React = require('react');
var Layout = require('../layouts/DefaultLayout');
var nav = require('./nav');

var NotFoundPage = React.createClass({
  render: function() {
    return <Layout
      header={this.renderNav()}
      title='About'
      content={this.renderContent()}
    />;
  },

  renderNav: function() {
    return nav(this.props.path);
  },

  renderContent: function() {
    return 'About';
  }
});

module.exports = NotFoundPage;
