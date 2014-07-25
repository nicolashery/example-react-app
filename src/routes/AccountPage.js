var React = require('react');
var Layout = require('../layouts/DefaultLayout');
var nav = require('./nav');
var AccountForm = require('../controllers/AccountForm');

var LoginPage = React.createClass({
  render: function() {
    return <Layout
      header={this.renderNav()}
      title='Account'
      content={this.renderContent()}
    />;
  },

  renderNav: function() {
    return nav(this.props.path);
  },

  renderContent: function() {
    return (
      <AccountForm />
    );
  }
});

module.exports = LoginPage;
