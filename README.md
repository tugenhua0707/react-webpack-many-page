
## 使用React+ES6+webpack 构建项目实现热加载--第二种方案
#### 1. 将代码内联到js入口文件里面
###### 如下代码：
<pre>
  entry: {
    index: [
      'webpack-dev-server/client?http://127.0.0.1:8080',
      'webpack/hot/dev-server',
      './pages/index/index.js'
    ],
    index2: [
      'webpack-dev-server/client?http://127.0.0.1:8080',
      'webpack/hot/dev-server',
      './pages/index2/index.js'
    ]
  }
</pre>
###### 如上：加了二句代码：webpack-dev-server/client?http://127.0.0.1:8080和webpack/hot/dev-server；
#### 2. 在 plugins：[new webpack.HotModuleReplacementPlugin()]加上这句代码;如下代码：
<pre>
  plugins：[
    new webpack.HotModuleReplacementPlugin()
  ]
</pre>
#### 3. 在config的配置上加上如下配置：
<pre>
  devServer: {
    contentBase: './',
    hot: true
  }
</pre>
###### 启动服务器后，会在项目根目录下打开；
#### 4. 在package.json代码中如下配置一下：
<pre>
  "scripts": {
    "dev": "webpack-dev-server --config webpack.config.js"
  },
</pre>
##### 代码运行命令如下：
###### 1. 运行webpack命令 打包生成对应的文件； webpack
###### 2. 运行 npm run dev 命令开启服务器，且以后每次js代码更新都不需要重新，页面会自动刷新；
