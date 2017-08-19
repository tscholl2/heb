const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./base');

module.exports = merge(base, {
  entry: [
    'react-hot-loader/patch',
    './src/index.ts',
  ],
  devtool: 'eval',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});