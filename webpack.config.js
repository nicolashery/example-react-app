var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, loader: 'sweetjs?modules[]=es6-macros,readers[]=jsx-reader',
        exclude: [
          path.join(__dirname, 'node_modules')
        ]
      },
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      {test: /\.svg/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.eot/, loader: 'url-loader?limit=10000&mimetype=application/vnd.ms-fontobject'},
      {test: /\.woff/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf/, loader: 'url-loader?limit=10000&mimetype=application/x-font-ttf'}
    ]
  }
};
