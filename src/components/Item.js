var React = require('react');
var cx = require('react/lib/cx');
var moment = require('moment');
var TagList = require('./TagList');

require('./Item.less');

var Item = React.createClass({
  propTypes: {
    item: React.PropTypes.object,
    short: React.PropTypes.bool
  },

  DATE_FORMAT: 'MMMM Do YYYY, [at] h:mma',

  render: function() {
    var item = this.props.item;

    var classes = cx({
      'Item': true,
      'is-short': this.props.short
    });

    return (
      <div className={classes}>
        <div className="Item-title">
          <div className="Item-name">{item.name}</div>
          {this.renderTags()}
        </div>
        {this.renderDate()}
        {this.renderText()}
      </div>
    );
  },

  renderDate: function() {
    var item = this.props.item;
    var date = moment(item.createdOn).format(this.DATE_FORMAT);

    return <div className="Item-date">{'Created on ' + date}</div>;
  },

  renderTags: function() {
    var item = this.props.item;
    var tags = item && item.tags;

    if (!(tags && tags.length)) {
      return null;
    }

    return (
      <div className="Item-tags">
        <TagList tags={tags} />
      </div>
    );
  },

  renderText: function() {
    var item = this.props.item;
    var text = item && item.text;

    if (!(text && text.length)) {
      return null;
    }

    return <div className="Item-text">{text}</div>;
  }
});

module.exports = Item;
