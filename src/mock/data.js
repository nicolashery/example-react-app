var fn = require('fn.js');

var data = {};

data.user = {
  id: '21',
  username: 'demo',
  fullName: 'Mary Smith'
};

var blue = '#4d77cb';
var red = '#cb4d4d';
var green = '#34b27d';


var tags = [
 {id: '301', slug: 'task', name: 'Task', color: blue, createdOn: '2014-07-29T11:39:00-04:00'},
 {id: '302', slug: 'done', name: 'Done', color: green, createdOn: '2014-07-29T14:39:00-04:00'}
];

var items = [
  {
    id: '4001',
    name: 'Order airline tickets',
    text: 'Look for cheap prices.\n\nTry Hipmunk: http://www.hipmunk.com/',
    tags: [{slug: 'task'}],
    createdOn: '2014-07-29T11:18:00-04:00'
  },
  {
    id: '4002',
    name: 'Buy groceries',
    text: '',
    tags: [{slug: 'task'}, {slug: 'done'}],
    createdOn: '2014-07-29T15:20:00-04:00'
  }
];

function processItem(item) {
  var itemTags = fn.map(function(tag) {
    var match = fn.filter(function(d) { return d.slug === tag.slug; }, tags);
    match = match[0];
    return match;
  }, item.tags);
  return fn.merge(item, {tags: itemTags});
}

data.items = fn.map(processItem, items);

window.data = data;

module.exports = data;
