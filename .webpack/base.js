const webpack = require("webpack");
const path = require("path");

const env = {
  "process.env.COMMIT": JSON.stringify(
    require("child_process")
      .execSync("git rev-parse HEAD")
      .toString()
      .trim(),
  ),
  "process.env.BUILD_TIME": JSON.stringify(new Date().toJSON()),
};

module.exports = {
  entry: { bundle: ["./src/index.ts", "./src/style.scss"] },

  output: {
    path: path.join(__dirname, "..", "www", "lib"),
    filename: "bundle.js",
    publicPath: "/lib",
  },

  resolve: {
    modules: [path.join(__dirname, "..", "src"), "node_modules"],
    extensions: [".js", ".ts", ".tsx"],
  },

  plugins: [new webpack.DefinePlugin(env)],

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              useCache: true,
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: (process.NODE_ENV === "development"
          ? ["style-loader"]
          : [{ loader: "file-loader", options: { name: "[name].css" } }, "extract-loader"]
        ).concat([
          {
            loader: "css-loader",
            options: {
              minimize: true,
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [
                  require("autoprefixer")({
                    browsers: ["last 2 versions"],
                  }),
                ];
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [path.join(__dirname, "..", "node_modules")],
            },
          },
        ]),
      },
    ],
  },
};
