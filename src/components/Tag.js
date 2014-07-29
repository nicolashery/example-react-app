var React = window.React = require('react');

require('./Tag.less');

var Tag = React.createClass({
  propTypes: {
    tag: React.PropTypes.object
  },

  render: function() {
    var tag = this.props.tag;

    var style;
    if (tag.color) {
      style = {'background-color': tag.color};
    }

    var itemCount;
    if (tag.itemCount) {
      itemCount = <span>{' (' + tag.itemCount + ')'}</span>;
    }

    return (
      <div className="Tag" style={style}>
        {tag.name}
        {itemCount}
      </div>
    );
  }
});

module.exports = Tag;
