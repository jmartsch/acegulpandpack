const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
import path from 'path';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// const Jarvis = require('webpack-jarvis');

console.log('using webpack.dev.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  // module: { // example for typescript
  //   rules: [{
  //     test: /\.tsx?$/,
  //     loader: "babel-loader",
  //     exclude: /node_modules/
  //   }]
  // },
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static'
    }),
  ]
});
