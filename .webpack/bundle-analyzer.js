const merge = require('webpack-merge');
const base = require('./base');
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');

module.exports = merge(base, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 8080,
    }),
  ],
});