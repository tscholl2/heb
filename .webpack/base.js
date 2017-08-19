const webpack = require('webpack');
const path = require('path');
// require('dotenv').config();

const env = {
  'process.env.COMMIT': JSON.stringify(require('child_process').execSync('git rev-parse HEAD').toString().trim()),
  'process.env.BUILD_TIME': JSON.stringify(new Date().toJSON()),
};

for (let key in process.env) {
  if (process.env.hasOwnProperty(key)) {
    let value = process.env[key];
    env[`process.env.${key}`] = JSON.stringify(value);
  }
}

module.exports = {
  entry: './src/entry.ts',

  output: {
    path: path.join(__dirname, '..', 'www', 'lib'),
    filename: 'bundle.js',
    publicPath: '/lib',
  },

  resolve: {
    modules: [
      path.join(__dirname, '..', 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.ts', '.tsx'],
  },

  plugins: [
    new webpack.DefinePlugin(env),
  ],

  module: {
    rules: [{
        test: /\.ts(x)?$/,
        use: [{
          loader: 'awesome-typescript-loader',
          options: {
            useCache: true,
          }
        }],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')({
                    browsers: ['last 2 versions']
                  }),
                ];
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.join(__dirname, '..', 'node_modules')],
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: ['file-loader'],
      },
    ],
  },

};