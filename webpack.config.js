/*
 * @title Webpack Config
 */

// Dependencies
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import path from 'path';

// Config
import {
  config
} from './gulpfile.babel.js/config';

// Plugins
var WebpackNotifierPlugin = require('webpack-notifier');

const webpackConfig = {

  mode: process.env.NODE_ENV ? 'production' : 'development',

  entry: {
    main: config.paths.scripts.src
  },
  output: {
    // path: path.resolve(__dirname, paths.dest),
    filename: '[name].[contenthash].js',
    publicPath: config.paths.webpackPublicPath
  },

  optimization: {
    // runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },

  module: {
    rules: [{
      test: /^(?!.*\.{test,min}\.js$).*\.js$/,
      exclude: /node_modules\/(?!(dom7|ssr-window|swiper|mixitup)\/)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          cacheDirectory: true
        }
      }
    },
    {
      test: /\.s?css$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    }
    ]
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules')
    ]
  },
  plugins: [
    // ensure that we get a production build of any dependencies
    new CleanWebpackPlugin(config.paths.scripts.dest),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      filename: '../../views/main.tpl',
      template: config.paths.templates.inject,
      inject: true,
      hash: false,
      alwaysWriteToDisk: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: false
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackNotifierPlugin({
      skipFirstNotification: true
    })
  ]

};

if (process.env.NODE_ENV === 'production') {
  // console.log('Welcome to production');
  webpackConfig.devtool = 'source-map';
}
if (process.env.NODE_ENV === 'development') {
  // console.log('Webpack development config');
  webpackConfig.devtool = 'source-map';

}

module.exports = webpackConfig;
