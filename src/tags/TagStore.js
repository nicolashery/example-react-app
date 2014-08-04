var Fluxy = require('fluxy');
var $ = Fluxy.$;
var TagConstants = require('./TagConstants');

module.exports = Fluxy.createStore({
  name: 'TagStore',

  getInitialState: function() {
    return {
      tags: null,
      fetchRequest: null
    };
  },

  isFetching: function() {
    return this.get(['fetchRequest', 'status']) === 'pending';
  },

  actions: [
    [TagConstants.TAGS_FETCH, function(payload) {
      this.set('tags', null);
      this.setFromJS('fetchRequest', {
        status: 'pending',
        payload: payload
      });
    }],

    [TagConstants.TAGS_FETCH_SUCCESS, function(payload) {
      this.setFromJS('tags', payload.tags);
      this.set('fetchRequest', function(request) {
        return $.assoc(request, 'status', 'success');
      });
    }],

    [TagConstants.TAGS_FETCH_FAIL, function(payload) {
      this.set('fetchRequest', function(request) {
        return $.assoc(request,
          'status', 'error',
          'error', $.js_to_clj(payload.error)
        );
      });
    }]
  ]
});
