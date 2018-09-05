import React from 'react'
import { withRouter,Route,Redirect } from 'react-router-dom'
import store from 'src/store'
import connect from 'connect'

/**
 * 用于对需要登陆的页面进行判断,每次切换路由后都会进入到这里面来权限认证
 * 也相当于路由拦截器
 */
@connect
@withRouter
export default class AuthRoute extends React.Component{
    render(){
        const { component:Component,...rest } = this.props;
        const { history,showAlert } = rest;
        const { username:user } = store.getState().user.user
        // 先判断是否登录
        if(!user){
            showAlert({
                title:"请先登录!"
            });
            history.slideStatus = "top";
            return <Redirect to="/login" />;
        }
        return <Route component={Component} {...rest} />
    }
}