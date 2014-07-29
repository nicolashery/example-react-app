var React = require('react');
var $ = require('fluxy').$;
var TagActions = require('../tags/TagActions');
var TagStore = require('../tags/TagStore');

var debug = require('bows')('TagCountList');

var TagCountList = React.createClass({
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

    if (this.state.loading) {
      return this.renderLoading();
    }

    return this.renderTags();
  },

  renderLoading: function() {
    return <div>Fetching tags...</div>;
  },

  renderTags: function() {
    if (!$.count(this.state.tags)) {
      return <div>No tags yet</div>;
    }

    return <div>{JSON.stringify(mori.clj_to_js(this.state.tags))}</div>;
  }
});

module.exports = TagCountList;
