var backend = require('../mock/backend');

var ItemService = {
  fetch: function(token) {
    return backend.get('/items', token)
    .then(function(resp) {
      if (resp.status !== 200) {
        return Promise.reject(resp.body);
      }

      return resp.body;
    });
  }
};

module.exports = ItemService;
