# React 今日头条 WebApp

基于 React(2.5) + redux + react-router-dom + axios + NProgress + less + ES6 等开发一款简易版今日头条 WebApp，UI 界面参考了安卓版的今日头条、flex 布局以及rem适配常见移动端。
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## 开发目的

通过学习开发一个 React 全家桶项目，让自己更熟练的使用 React 全家桶、模块化开发、组件化开发、ES6、ES7等等知识，提高自己的技术能力。

## 技术栈

**前端**

* `React`：用于构建用户界面的 MVVM 框架
* `react-router-dom`：为单页面应用提供的路由系统，使用了 `ES6 的 import(copmponent)` 技术来实现异步加载优化性能
* `redux`：React 集中状态管理，模块化定义`action`和`reducer`在多个组件共享某些状态时非常便捷
* `LESS`：css 预编译处理器
* `ES6、ES7`：ECMAScript 新一代语法，模块化、解构赋值、Promise、async、await 等方法非常好用

**接口数据**

* `MockApi`：由于是做个demo练习，就没有搭建服务端提供数据了，API接口数据来源于第三方Mock模拟接口数据
* `axios`：用来请求服务端 API 数据

**其他工具**

* `react-create-app`：React 脚手架工具，快速初始化项目代码,后面对整个项目结构做了相应调整，比如build下面的webpack配置文件
* `fastclick` ：消除 click 移动游览器 300ms 的延时
* `react-id-swiper` ： react专用的swiper插件
* `NProgress` ： 移动设备的全站页面加载进度条插件

## 实现功能
首页新闻列表页面、新闻分类页面、新闻搜索页面、新闻发布页面、西瓜视频页面、微头条、关于我的页面、登录页面、消息发布页面、收藏/历史页面、系统设置页面等等

### 新闻列表、微头条
大部分用的是mock接口模拟的数据

### 西瓜视频页面
视屏模块用的是canvas绘制，来模拟视屏的暂停和播放

### 登录页面
也是用的mock接口

### 用户反馈 京东特供 搜索 头条商城 消息通知 收藏/历史等子页面
访问这些页面做了权限认证，其实就是需要用户登录，登录后的信息放在Cookie中

### 下拉加载功能
用的PullLoad组件来实现

### 请求接口和数据
所有的请求接口和数据等放在了redux的store中，模块化定义了reducer和action

## 问题
首页的头部搜索栏和底部的导航栏在滚动有问题，没有固定住

## TODO
1. 优化首页加载速度
2. 优化重复代码
3. 增加真实的后台接口
4. emm，更多功能容我再想想哈

## 最后

如果觉得我的项目还不错的话 :clap:，就给个 [star](https://github.com/GolderBrother/react-simple-toutiao) :star: 鼓励一下吧~

## Build Setup

如果需要在服务器上搭建的话就需要将 API 放到自己的服务器上面。

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production with minification
npm run build
```