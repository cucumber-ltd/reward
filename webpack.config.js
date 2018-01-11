const path = require('path')

module.exports = {
  entry: './client/reward.js',
  output: {
    filename: 'reward.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
}