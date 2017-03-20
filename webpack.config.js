var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  // devtool: 'cheap-module-eval-source-map',
  // devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3002',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias:[
      'components'
    ].reduce((acc, dir) => ((acc[dir] = path.resolve(__dirname, './src/'+dir)) && acc), {})
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  }
};
