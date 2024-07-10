import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'SpinningWheel',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  resolve: {
    alias: {
      'spinning-wheel': path.resolve(__dirname, 'dist/bundle.js'),
    },
    extensions: ['.js', '.jsx'],
  },
};

