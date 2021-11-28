const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./common.config');

const env = require('../env');
const { devServer, devBackendProxy } = env;
const proxyRules = require('../proxy/rules');

console.log('devBackendProxy', devBackendProxy);
// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = webpackMerge(webpackCommon, {

  devtool: 'inline-source-map',
  mode: 'development',
  target: 'web',
  output: {
  
    path: path.resolve(__dirname, '../static/dist'),

    filename: '[name].js',

    sourceMapFilename: '[name].map',

    chunkFilename: '[id]-chunk.js',

    publicPath: '/'

  },

  module: {

    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true
            }
          }
        ]
      }
    ]

  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../static/index.html'),
      favicon: path.resolve(__dirname, '../static/favicon.ico')
    }),
    new HotModuleReplacementPlugin()
  ],

  devServer: {
    host: devServer.host || '0.0.0.0',
    disableHostCheck: true,   // That solved it
    port: devServer.port || 3000,
    headers: { 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    open: true,
    contentBase: path.resolve(__dirname, '../static'),
    watchContentBase: true,
    compress: true,
    hot: true,
    historyApiFallback: {
      disableDotRule: true
    },
    watchOptions: {
      ignored: /node_modules/
    },
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      ...proxyRules,
      // proxy to backend
      '/api/v1': {
        target: `${devBackendProxy.secure ? 'https' : 'http' }://${devBackendProxy.host}`,
        secure: devBackendProxy.secure,
        headers: {
          'Host': `${devBackendProxy.host}`,
          'Cookie': '' // send cookie on demand
        },
        pathRewrite: function (path) {
          return path.replace(/^\/api\/v1/, ''); // remove '/api/v1' prefix when requesting
        }
      }
    }
  }
});
