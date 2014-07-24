var React = require('react');
var Layout = require('../layouts/DefaultLayout');
var NavBar = require('./NavBar');

var NotFoundPage = React.createClass({
  path: '/404',

  render: function() {
    return <Layout
      header={this.renderNavBar()}
      title='Not found'
      content={this.renderContent()}
    />;
  },

  renderNavBar: function() {
    return <NavBar activePath={this.path} />;
  },

  renderContent: function() {
    return (
      <div>
        <p>Sorry! Could not find what you were looking for...</p>
      </div>
    );
  }
});

module.exports = NotFoundPage;
