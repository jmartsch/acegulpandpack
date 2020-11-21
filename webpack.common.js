/*
 * @title Webpack Config
 */

// Dependencies
const webpack = require('webpack');
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
const  CleanWebpackPlugin = require('clean-webpack-plugin');

// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

import path from 'path';

// Config
import {
  config
} from './gulpfile.babel.js/config';

// Plugins
// const WebpackNotifierPlugin = require('webpack-notifier');

const webpackConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  performance: {hints: false},
  entry: {
    // klaroConfig: './src/scripts/klaroConfig.js',
    // klaro: './src/scripts/klaro.js',
    main: config.paths.scripts.src
  },
  output: {
    // path: path.resolve(__dirname, paths.dest),
    filename: '[name].[contenthash].js',
    publicPath: config.paths.webpackPublicPath
  },

  optimization: {
    runtimeChunk: 'single',
    chunkIds: 'named',
    moduleIds: 'deterministic',
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendor',
    //       chunks: 'all'
    //     }
    //   }
    // }
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
    modules: [path.resolve(__dirname, 'node_modules')],
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  plugins: [
    // ensure that we get a production build of any dependencies
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      klaro: 'klaro',
      'window.klaro': 'klaro'
    }),
    new HtmlWebpackPlugin({
      filename: '../../views/scripts.html',
      template: config.paths.templates.inject,
      inject: true,
      hash: false,
      alwaysWriteToDisk: false,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: false
      },
      // chunksSortMode: 'dependency'
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
  ]

};

console.log('webpack mode: ' + webpackConfig.mode);

module.exports = webpackConfig;
