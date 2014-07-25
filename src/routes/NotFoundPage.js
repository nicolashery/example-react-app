var React = require('react');
var Layout = require('../layouts/DefaultLayout');
var nav = require('./nav');

var NotFoundPage = React.createClass({
  render: function() {
    return <Layout
      header={this.renderNav()}
      title='Not found'
      content={this.renderContent()}
    />;
  },

  renderNav: function() {
    return nav(this.props.path);
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
