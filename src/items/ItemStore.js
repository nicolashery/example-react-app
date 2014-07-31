var Fluxy = require('fluxy');
var $ = Fluxy.$;
var ItemConstants = require('./ItemConstants');

module.exports = Fluxy.createStore({
  name: 'ItemStore',

  getInitialState: function() {
    return {
      count: null,
      items: null,
      fetchRequest: null
    };
  },

  isFetching: function() {
    return this.get(['fetchRequest', 'status']) === 'pending';
  },

  actions: [
    [ItemConstants.ITEMS_FETCH, function(payload) {
      this.set('count', null);
      this.set('items', null);
      this.setFromJS('fetchRequest', {
        status: 'pending',
        payload: payload
      });
    }],

    [ItemConstants.ITEMS_FETCH_SUCCESS, function(payload) {
      this.setFromJS('count', payload.count);
      this.setFromJS('items', payload.items);
      this.set('fetchRequest', function(request) {
        return $.assoc(request, 'status', 'success');
      });
    }],

    [ItemConstants.ITEMS_FETCH_FAIL, function(payload) {
      this.set('fetchRequest', function(request) {
        return $.assoc(request,
          'status', 'error',
          'error', $.js_to_clj(payload.error)
        );
      });
    }],

    [ItemConstants.ITEMS_CLEAR_REQUESTS, function() {
      this.set('fetchRequest', null);
    }]
  ]
});
