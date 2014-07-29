var React = window.React = require('react');
var Tag = require('./Tag');

require('./TagList.less');

var TagList = React.createClass({
  propTypes: {
    tags: React.PropTypes.array
  },

  render: function() {
    var tags = this.props.tags;

    tags = tags.map(function(tag) {
      return <li className="TagList-item" key={tag.id}><Tag tag={tag} /></li>;
    });

    return (
      <ul className="TagList">
        {tags}
      </ul>
    );
  }
});

module.exports = TagList;
