const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./base');

module.exports = merge(base, {
  devtool: undefined,
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      sourceMap: false,
      compress: {
        screw_ie8: true,
        dead_code: true,
        warnings: true,
        conditionals: true,
        unused: true,
        loops: true,
        booleans: true,
        evaluate: true,
        properties: true,
        comparisons: true,
        sequences: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false
      },
    }),
  ],
});