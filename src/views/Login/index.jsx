import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import Icon from 'components/Icon-svg'
import connect from 'connect'
import './index.less'

@connect
@withRouter
export default class Login extends React.Component {
    state = {
        username: '',
        password: '',
        username_msg: '',
        password_msg: ''
    }
    handleUsername(value=''){
        this.setState({
            username:value
        })
    }
    handlePassword(value=''){
        this.setState({
            password:value
        })
    }
    close(){
        const { history } = this.props;
        history.slideStatus = "bottom";
        // withRouter 装饰器,在props对象上带有goBack这方法，返回
        history.goBack();
    }
    async login(){
        try {
            let { username, password, username_msg, password_msg } = this.state;
            if(!username){
                username_msg = "用户名不能为空";
                this.setState({
                    username_msg
                })
                return
            }
            if(!password){
                password_msg = "密码不能为空";
                this.setState({
                    password_msg
                })
                return
            }
            this.setState({
                username_msg:'',
                password_msg:''
            });
            const { login, history, setFooterList,showLoading,hideLoading } = this.props;
            const login_res = await login({
                username,
                password
            });
            // 密码错误
            if(login_res.code == 0){
                password_msg = login_res.msg;
                this.setState({
                    password_msg
                });
                return;
            };
            setFooterList({title:'我的',icon:'account',path:'/account'});
            history.slideStatus = "buttom";
            history.goBack();
        } catch (error) {
            this.setState({
                password:''
            })
            console.error(error);
            // throw new Error(error)
        }

    }
    render() {
        const { username, password, username_msg, password_msg } = this.state
        return (
            <div className="login-wrapper">
                <Icon iconName="close" className="close-icon" onClick={() => this.close()}/>
                <h2>登陆你的头条，精彩永不消失</h2>
                <div className="input username">
                    <input type="text" value={username} placeholder="用户名随便填" onChange={(e) => this.handleUsername(e.target.value)}/>
                    <span className={`${username_msg ? 'animate' : ''}`}>{ username_msg }</span>
                </div>
                <div className="input password">
                    <input type="password" value={password} placeholder="密码123456" onChange={(e) => this.handlePassword(e.target.value)}/>
                    <span className={`${password_msg ? 'animate' : ''}`}>{ password_msg }</span>
                </div>
                <button className="login" onClick={() => this.login()}>登录头条</button>
            </div>
        )
    }
}