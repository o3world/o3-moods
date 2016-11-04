'use strict';

const path = require('path');

module.exports = {
  entry: './public/app.module.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'public')
      ],
      loader: 'babel'
    }]
  },
  devtool: 'source-map'
};
