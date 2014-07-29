var React = require('react');
var Layout = require('../layouts/DefaultLayout');
var nav = require('./nav');
var TagActions = require('../tags/TagActions');
var UserStore = require('../user/UserStore');
var TagCountList = require('../controllers/TagCountList');

var DashboardPage = React.createClass({
  componentWillMount: function() {
    TagActions.clearRequests();
    TagActions.fetch(UserStore.token());
  },

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
    return (
      <TagCountList />
    );
  }
});

module.exports = DashboardPage;
