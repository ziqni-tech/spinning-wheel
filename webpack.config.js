const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  return {
    entry: './src/index.js',

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.es6$|\.js$/,
          use: {
            loader: 'babel-loader',
          },
          exclude: /(node_modules|bower_components)/
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images/'
              }
            }
          ]
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: './src/images', to: 'images' }
        ]
      })
    ],
  };
};