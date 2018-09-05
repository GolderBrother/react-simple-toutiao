import React from 'react'
import Icon from 'components/Icon-svg'
import connect from 'connect'
import { withRouter } from 'react-router-dom'
// connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来
@connect
@withRouter
// withRouter可以包装任何自定义组件,将组件包一层withRouter，就可以拿到需要的路由信息
export default class Head extends React.Component {
    state = {
        infoList:[
            { num: 0, title: '动态' },
            { num: 0, title: '关注' },
            { num: 0, title: '粉丝' }
        ],
        serviceList:[
            { icon: 'shoucang', title: '收藏' },
            { icon: '3lishi', title: '历史' },
            { icon: 'school', title: '推送' },
        ]
    }
    login(){
        const { history } = this.props;
        history.slideStatus = 'left';
        history.push('/login');
    }
    // 查看收藏/历史/推送等
    goRecord(index){
        const { history } = this.props;
        // 路由动画,通过 history.slideStatus 来判断如何动画
        history.slideStatus = 'left';
        history.push(`/record/${index}`)
    }
    render() {
        const {infoList,serviceList} = this.state
        const {user} = this.props.state.user
        console.log(user)
        const unLoginAvatar = require('src/assets/images/account-circle.svg');
        return (
            <section className="head-wrapper">
                <div className="hd-t">
                    <div className="info">
                        <span className="avatar bg-cover-all" style={{ backgroundImage:`${ user.username ? 'url('+ user.avatar +')' : 'url('+ unLoginAvatar + ')'}` }}></span>
                        {
                            user.username ? (<span className="name">{user.username}</span>) : (<span className="login" onClick={(e) => this.login()}>未登录</span>) 
                        }
                    </div>
                </div>
                <div className="hd-m df-c">
                    {
                        infoList.map((item,index) => (
                            <div className="hd-m-item df-c" key={index}>
                                <span>{item.num}</span>
                                <div className="hd-m-text">{item.title}</div>
                            </div>
                        ))
                    }
                </div>
                <div className="hd-b df-c border-half-bottom">
                    {
                        serviceList.map((item,index) => (
                            <div className="hd-b-item df-c" key={index} onClick={(e) => this.goRecord(index)}>
                                <Icon iconName={item.icon}></Icon>
                                <div className="hd-b-text">{item.title}</div>
                            </div>
                        )) 
                    }
                </div>
            </section>
        )
    }
}