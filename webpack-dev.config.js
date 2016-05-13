var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    // our entry file
    './app/main.react.js'
  ],
  output: {
    path: './build',
    filename: 'bundle.[hash].js'
  },
  devtool: 'eval',
  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader"},
      // image loader - https://www.npmjs.com/package/image-webpack-loader
      {
        test: /\.(svg|ico)$/i,
        loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      // javascript/jsx loader - https://www.npmjs.com/package/babel-loader
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?stage=0&optional=runtime'],
      },
      // styles
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
    ]
  },
  postcss: [
    require('autoprefixer-core')
  ],
  plugins: [
    new LiveReloadPlugin({
      port: 35729,
      appendScriptTag: true
    }),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      inject: true,
      title: '',
      filename: 'index.html',
      template: './app/index.html'
    })
  ],
};
