var React = require('react');
var Item = require('./Item');

require('./ItemList.less');

var ItemList = React.createClass({
  propTypes: {
    items: React.PropTypes.array
  },

  render: function() {
    var items = this.props.items;

    items = items.map(function(item) {
      return (
        <li className="ItemList-item" key={item.id}>
          <Item item={item} short={true} />
        </li>
      );
    });

    return (
      <ul className="ItemList">
        {items}
      </ul>
    );
  }
});

module.exports = ItemList;
