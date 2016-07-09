
## 学习使用React+ES6+webpack 构建项目(可以实现热加载功能)
#### 假如现在 项目的 目录结构：
<pre>
demo                                        # 工程名
|   |--- html                               # 存放HTML模板页面
|   |--- images                             # 存放项目中用到的所有图片
|   |--- pages                              # 所有页面的js和css文件
|   |    |--- page1                         # 具体的页面
|   |         |--- xx.js                    # 单个页面的js文件
|   |         |--- xx.styl                  # 单个页面的css文件
|   |    |--- page2 
|   |         |--- xx.js
|   |         |--- xx.styl
|   |--- build                              项目打包后的js和css文件
|   |    |--- css                           打包后存放的css文件目录
|   |    |--- js                            打包后存放的js文件目录
|   |--- common                             # 所有页面依赖的公共业务组件

|   |---- doc                               # 文档
|   |---- package.json                      # 依赖包配置
|   |---- README.md                         # 默认文档
|   |---- webpack.config.js                 # webpack打包时使用的配置信息    
|   |---- server.js                         # 启动本地服务器
|   |---- .gitignore                        # 提交到git上排除的一些文件 
|   |---- xx.html                           # 打包后生成对应的html文件放在项目的根目录下(当然还有很多页面)
</pre>
###### 如上的项目的目录结构，
###### html是存放html模板页面，可以通过html-webpack-plugin插件会自动生成对应的页面,
###### pages目录是存放所有的单个页面的目录，比如page1页面，page2页面，在各个子文件夹下又存放对应页面的js文件
###### 和css文件；
###### build目录是打包后文件 会包含所有的css和js文件；
###### common目录 是存放一些公共的业务组件；
#### webpack.config.js 文件配置如下：
######  webpack中文件入口,第一个是webpack_hmr,另一个就是js文件入口,基本是上面规范写法就可以;
<pre>
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr',
    './index.js'
  ]
</pre>
###### 上面的只是单个的页面，但是如果有多个页面的话，可以如下配置：
<pre>
  entry: {
    index: [
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      './pages/index/index.js'
    ],
    index2: [
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      './pages/index2/index.js'
    ]
  }
</pre>
###### 多页面配置可以参考下官网 https://webpack.github.io/docs/multiple-entry-points.html
###### 同时在对应的单个页面的js文件下，需要如下代码，来实现热加载：
<pre>
  if (module.hot) {
    module.hot.accept()
  }
</pre>
###### 对应的css文件没有加这句代码是需要手动刷新才能看到效果的；如果js，没有这句代码的话，修改后保存的话，也是需要
手动刷新才能看到效果的；
###### webpack.config文件中需要加入以下几个插件
<pre>
  plugins: [
    new ExtractTextPlugin(),
    new HtmlwebpackPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
</pre>
###### 1. ExtractTextPlugin插件是动态生成外联css文件的，2. HtmlwebpackPlugin 插件是根据模板html页面生成新的
html文件的，3. NoErrorsPlugin插件 是报错但不退出webpack进程，4 HotModuleReplacementPlugin 插件是代码
热替换；
### 在webpack.config中加入如下配置实现源码调试：
<pre>
  devtool: '#source-map'
</pre>
###### 服务器端配置如下：
<pre>
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
</pre>
###### 切记：一定需要加上这句代码 publicPath: webpackConfig.output.publicPath, 否则的话，启动服务器后访问html页面会加载不到对应的css和js文件的；
###### 路由配置代码如下：
<pre>
  app.get('/index.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
app.get('/index2.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'index2.html'));
});
</pre>
###### 想要访问那个页面直接配置即可；
###### 代码运行方式：
###### 1. 首先使用webpack命令进行生成文件；webpack
###### 2. 在package.json文件下 配置如下：
<pre>
  "scripts": {
    "start": "node server.js"
  }
</pre>
###### 2-2. 启动服务器命令 运行 npm start 即可；
