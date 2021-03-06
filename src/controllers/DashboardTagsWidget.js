var React = require('react');
var $ = require('fluxy').$;
var TagStore = require('../tags/TagStore');
var tagWithLink = require('../tags/tagWithLink');

var SectionTitle = require('../components/SectionTitle');
var TagList = require('../components/TagList');

var debug = require('bows')('DashboardTagsWidget');

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
    debug('render', $.clj_to_js(this.state));
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

    var tags = this.tagsWithLink();
    tags = $.clj_to_js(tags);

    return <TagList tags={tags} />;
  },

  tagsWithLink: function() {
    return $.map(tagWithLink, this.state.tags);
  }
});

module.exports = DashboardTagsWidget;
