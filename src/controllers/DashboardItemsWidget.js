var React = require('react');
var $ = require('fluxy').$;
var ItemStore = require('../items/ItemStore');

var SectionTitle = require('../components/SectionTitle');
var ItemList = require('../components/ItemList');

var debug = require('bows')('DashboardItemsWidget');

require('./DashboardItemsWidget.less');

var DashboardItemsWidget = React.createClass({
  MAX_NUMBER_OF_ITEMS: 1,

  getInitialState: function() {
    return this.getItemStoreState();
  },

  componentDidMount: function () {
    ItemStore.addWatch(this.handleItemStoreChange);
  },

  componentWillUnmount: function () {
    ItemStore.removeWatch(this.handleItemStoreChange);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    var state = this.state;
    return !(
      $.equals(state.count, nextState.count) &&
      $.equals(state.items, nextState.items) &&
      $.equals(state.loading, nextState.loading)
    );
  },

  handleItemStoreChange: function(keys, oldState, newState) {
    this.setState(this.getItemStoreState());
  },

  getItemStoreState: function() {
    return {
      count: ItemStore.get('count'),
      items: ItemStore.get('items'),
      loading: ItemStore.isFetching()
    };
  },

  render: function() {
    debug('render');
    var content;

    if (this.state.loading) {
      content = this.renderLoading();
    }
    else {
      content = this.renderItems();
    }

    return (
      <div className="DashboardItemsWidget">
        {this.renderTitle()}
        {content}
      </div>
    );
  },

  renderTitle: function() {
    var countNode;
    var count = this.state.count;
    if (count) {
      countNode = <span>{' (' + count + ')'}</span>;
    }

    return <SectionTitle>{'Items'}{countNode}</SectionTitle>;
  },

  renderLoading: function() {
    return <div>Fetching items...</div>;
  },

  renderItems: function() {
    if (!$.count(this.state.items)) {
      return <div>No items yet</div>;
    }

    var items = $.take(this.MAX_NUMBER_OF_ITEMS, this.state.items);
    items = $.clj_to_js(items);

    return (
      <div>
        <div className="DashboardItemsWidget-itemList">
          <ItemList items={items} />
        </div>
        {this.renderAllItemsLink()}
      </div>
    );
  },

  renderAllItemsLink: function() {
    // TODO
    return <a href="#">See all items</a>;
  }
});

module.exports = DashboardItemsWidget;
