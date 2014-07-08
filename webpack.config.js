var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/, loader: 'sweetjs?modules[]=es6-macros,readers[]=jsx-reader',
      exclude: [
        path.join(__dirname, 'node_modules')
      ]
    }]
  }
};
