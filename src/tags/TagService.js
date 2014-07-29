var backend = require('../mock/backend');

var TagService = {
  fetch: function(token) {
    return backend.get('/tags', token)
    .then(function(resp) {
      if (resp.status !== 200) {
        return Promise.reject(resp.body);
      }

      return resp.body;
    });
  }
};

module.exports = TagService;
