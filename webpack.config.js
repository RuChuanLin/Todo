const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR = 'vendor';
const VENDOR_LIBS = [
  'react',
  'react-dom',
  'semantic-ui-css',
  'semantic-ui-react'
];

module.exports = {
  entry: {
    bundle: [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      './src/index.js'
    ],
    [VENDOR]: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: [VENDOR, 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    // })
  ]
};
