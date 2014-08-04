var React = require('react');
var Layout = require('../layouts/DefaultLayout');
var nav = require('./nav');
var TagActions = require('../tags/TagActions');
var ItemActions = require('../items/ItemActions');
var UserStore = require('../user/UserStore');
var DashboardTagsWidget = require('../controllers/DashboardTagsWidget');
var DashboardItemsWidget = require('../controllers/DashboardItemsWidget');

require('./DashboardPage.less');

var DashboardPage = React.createClass({
  componentWillMount: function() {
    TagActions.fetch(UserStore.token());
    ItemActions.fetch(UserStore.token());
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
      <ul className="DashboardPage-widgets">
        <li className="DashboardPage-widget"><DashboardTagsWidget /></li>
        <li className="DashboardPage-widget"><DashboardItemsWidget /></li>
      </ul>
    );
  }
});

module.exports = DashboardPage;
