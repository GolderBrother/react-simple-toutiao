import asyncComponent from './asyncComponent'

/**
 * 路由配置文件
 * 分成主要的首页相关的组件和引用的路由组件
 */

// 封装动态引入组件的函数
// const importComponents = file => asyncComponent(() =>
//     import(`src/components/${file}`));
const importViews = file => asyncComponent(() => import(`src/views/${file}`));

import NotFound from 'views/Error'

// layout视图
export const layoutRouterMap = [{
    path: '/',
    name: '首页',
    exact: true,
    component: importViews('Home')
}, {
    path: '/video',
    name: '视频',
    component: importViews('Video')
}, {
    path: '/headline',
    name: '微头条',
    component: importViews('Headline')
}, {
    path: '/account',
    name: '我的',
    component: importViews('Account')
}]

// 非layout视图
export const otherRouterMap = [{
    path: '/404',
    name: '404',
    component: NotFound
},{
    path:'/login',
    name:'登录',
    component: importViews('Login')
},{
    path:'/article/:id',
    name:'文章',
    component: importViews('Article')
},{
    path:'/feedback',
    name:'用户反馈',
    auth:true,
    component: importViews('Feedback') 
},{ 
    path:'/jingdong',
    name:'京东特供',
    auth:true,
    component: importViews('Jingdong')
},{
    path:'/search',
    name:'搜索',
    auth:true,
    component: importViews('Search')
},{
    path:'/mall',
    name:'头条商城',
    auth:true,
    component: importViews('Mall')
},{
    path:'/msg',
    name:'消息通知',
    auth:true,
    component: importViews('Msg')
},{
    path:'/record/:type',
    name:'收藏/历史',
    auth:true,
    component: importViews('Record')
},{
    path:'/system',
    name:'系统设置',
    component: importViews('System')
}]

// 导出所有视图组件
export const routes = [...layoutRouterMap, ...otherRouterMap] 