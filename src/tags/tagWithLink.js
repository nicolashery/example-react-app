var $ = require('fluxy').$;
var RouterService = require('../router/RouterService');

function tagWithLink(tag, linkAttribute) {
  linkAttribute = linkAttribute || 'href';
  var href = '#' + RouterService.uriFromRoute({
    path: '/items',
    query: {tags: [$.get(tag, 'slug')]}
  });
  return $.assoc(tag, linkAttribute, href);
}

module.exports = tagWithLink;
