const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    filename: devMode ? '[name].js' : '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'html-loader',
        options: {
          minimize: !devMode,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'simple-scaffold',
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
    }),
  ],
}