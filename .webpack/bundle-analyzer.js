const webpack = require("webpack");
const merge = require('webpack-merge');
const base = require('./base');
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');

module.exports = merge(base, {
  plugins: [
    new webpack.DefinePlugin({ ["process.env.NODE_ENV"]: JSON.stringify("bundle-analyzer") }),
    new BundleAnalyzerPlugin({
      analyzerPort: 8080,
    }),
  ],
});