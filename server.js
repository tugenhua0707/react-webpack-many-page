var express = require('express')
var webpack = require('webpack')

var path = require('path')

var app = express()

// 1. 申明
var webpackDevMiddleware = require("webpack-dev-middleware")
var webpackHotMiddleware = require("webpack-hot-middleware")
var webpackConfig = require('./webpack.config.js')
var compiler = webpack(webpackConfig)

// 2. Dev部分处理
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: webpackConfig.output.filename,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
  },
  historyApiFallback: true
}))

// 3. Hot部分处理
app.use(webpackHotMiddleware(compiler, {
  // 非必要
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
  publicPath:webpackConfig.output.publicPath
}))
app.use('/public', express.static('public'));

app.get('/index.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index2.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'index2.html'));
});

app.listen(3000, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3000');
});
