const merge = require("webpack-merge");
const webpack = require("webpack");
const base = require("./base");

module.exports = merge(base, {
  entry: ["./src/index.ts"],
  devtool: "eval",
  plugins: [
    new webpack.DefinePlugin({ ["process.env.NODE_ENV"]: JSON.stringify("development") }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
