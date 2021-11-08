const HtmlWebpackPlugin = require('html-webpack-plugin');
const LazyLoadPlugin = require('../index');
const {resolve} = require('path');

module.exports = {
  entry: resolve(__dirname, './index.js'),
  output: {
    path: resolve(__dirname, '../dist'),
  },
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './index.html'),
    }),
    new LazyLoadPlugin(),
  ],
};
