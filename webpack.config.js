'use strict';

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';

module.exports = function () {

  var config = {};

  config.entry = isTest ? void 0 : {
    app: './src/app/tms-app.module.js'
  };

  config.resolve = {
    alias: {
      "jquery": "angular-patternfly/node_modules/patternfly/node_modules/jquery"
    }
  };

  config.output = isTest ? {} : {
    path: __dirname + '/dist',
    publicPath: 'http://localhost:8080/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  };

  if (isTest) {
    config.devtool = 'inline-source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  config.module = {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file-loader'
    }, {
      test: /\.html$/,
      loader: 'raw-loader'
    }]
  };

  config.plugins = [];

  config.plugins.push(
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jquery": "jquery",
      "window.jQuery": "jquery"
    })
  );

  if (!isTest) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/content/index.html',
        inject: 'body'
      })
    )
  }

  config.devServer = {
    contentBase: './src/content',
    stats: 'minimal'
  };

  return config;
}();