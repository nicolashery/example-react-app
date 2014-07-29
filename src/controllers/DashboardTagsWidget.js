var React = require('react');
var $ = require('fluxy').$;
var fn = require('fn.js');
var TagActions = require('../tags/TagActions');
var TagStore = require('../tags/TagStore');

var SectionTitle = require('../components/SectionTitle');
var TagList = require('../components/TagList');

var debug = require('bows')('TagCountList');

var DashboardTagsWidget = React.createClass({
  getInitialState: function() {
    return this.getTagStoreState();
  },

  componentDidMount: function () {
    TagStore.addWatch(this.handleTagStoreChange);
  },

  componentWillUnmount: function () {
    TagStore.removeWatch(this.handleTagStoreChange);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    var state = this.state;
    return !(
      $.equals(state.tags, nextState.tags) &&
      $.equals(state.loading, nextState.loading)
    );
  },

  handleTagStoreChange: function(keys, oldState, newState) {
    this.setState(this.getTagStoreState());
  },

  getTagStoreState: function() {
    return {
      tags: TagStore.get('tags'),
      loading: TagStore.isFetching()
    };
  },

  render: function() {
    debug('render');
    var content;

    if (this.state.loading) {
      content = this.renderLoading();
    }
    else {
      content = this.renderTags();
    }

    return (
      <div>
        {this.renderTitle()}
        {content}
      </div>
    );
  },

  renderTitle: function() {
    var countNode;
    var count = $.count(this.state.tags);
    if (count) {
      countNode = <span>{' (' + count + ')'}</span>;
    }

    return <SectionTitle>{'Tags'}{countNode}</SectionTitle>;
  },

  renderLoading: function() {
    return <div>Fetching tags...</div>;
  },

  renderTags: function() {
    if (!$.count(this.state.tags)) {
      return <div>No tags yet</div>;
    }

    var tags = $.clj_to_js(this.state.tags);

    return <TagList tags={tags} />;
  }
});

module.exports = DashboardTagsWidget;
