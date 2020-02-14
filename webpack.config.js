const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const dotenv = require('dotenv');

const devMode = process.env.NODE_ENV !== 'production';

const config = {
  mode: devMode ? 'development' : 'production',
  entry: {
    app: './src/app.module.js',
    vendor: './src/vendor.module.js',
  },
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /bower_components/],
        loader: ['babel-loader'],
      },
      {
        test: /\.(css|scss)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // for fixing of loading bootstrap icon files
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
        options: {
          name: './fonts/[name].[ext]',
        },
      },
      {
        test: /\.(eot|ttf)$/,
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[ext]',
        },
      },
      { test: /\.html$/, loader: 'html-loader' },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
      }),
      new OptimizeCssAssetsWebpackPlugin({}),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'styles/[name].[hash].css',
    //   chunkFilename: 'styles/[id].[hash].css',
    // }),
  ],
  devServer: {
    port: 3000,
    contentBase: './src/',
    historyApiFallback: true,
  },
};

module.exports = config;
