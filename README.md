
## 使用React+ES6+webpack 构建项目实现热加载--第三种方案
#### 1. 直接在webpack.config.js上配置。这个办法最简单。
<pre>
devServer: {
  contentBase: './',
  port:9000,
  historyApiFallback:true
}
</pre>
###### entry入口文件改为如下：
<pre>
  entry: {
    index: [
      './pages/index/index.js'
    ],
    index2: [
      './pages/index2/index.js'
    ]
  },
</pre>
##### 运行命令如下：
###### 1. 运行webpack命令；webpack
###### 2. 运行 npm run dev 即可；在浏览器上打开 http://localhost:9000/webpack-dev-server/ 
###### 接着更改对应的js文件 可以看到能实时更新页面；

