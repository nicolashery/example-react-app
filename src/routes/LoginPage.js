var React = require('react');
var Layout = require('../layouts/DefaultLayout');
var nav = require('./nav');
var LoginRedirect = require('../controllers/LoginRedirect');
var LoginForm = require('../controllers/LoginForm');

var LoginPage = React.createClass({
  render: function() {
    return <Layout
      header={this.renderNav()}
      title='Login'
      content={this.renderContent()}
    />;
  },

  renderNav: function() {
    return nav(this.props.path);
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
