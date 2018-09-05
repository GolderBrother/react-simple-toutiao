import React from 'react'
import { withRouter } from 'react-router-dom'
import TitleBar from 'components/TitleBar'
import Icon from 'components/Icon-svg'
import connect from 'connect'
import SwitchCheck from 'components/Switch'
import { Local } from 'utils/storage'
import { systemData } from 'reducers/data'
import './index.less'

@connect
@withRouter
export default class System extends React.Component {
    state = {
        title: "系统设置",
        info:{
            send:Local.get('system_send') || false,
            list:Local.get('system_list') || false
        },
        featureList: []
    }
    componentWillMount(){
        const { featureList=[] } = systemData;
        this.setState({
            featureList
        })
    }
    // 登出
    logout() {
        const { history, signOut, setFooterList } = this.props;
        signOut();
        setFooterList({ title: '点击登录', icon: 'comment', path: '/login' });
        history.slideStatus = 'right';
        history.push('/account')
    }
    // 保存更改
    saveChange(attr,val) {
        let { info:obj } = this.state;
        obj[attr] = val;
        this.setState(obj)
        const {send,info} = this.state.info;
        Local.set({
            system_send:send,
            system_list:info
        })
    }
    
    render() {
        const { title, featureList } = this.state;
        return (
            <div className="system-wrapper">
                <TitleBar title={title} />
                {
                    featureList.map((list, listIndex) => (
                        <div className="box" key={listIndex}>
                            {
                                list.map((item, index) => (
                                    <div className="li df-sb border-half-bottom" key={index}>
                                        <span>{item.title}</span>
                                        {item.icon && (<Icon iconName={item.icon}></Icon>)}
                                        {
                                            item.switch && (
                                                <SwitchCheck handleChange={(e) => this.saveChange('send', e)} />
                                            )
                                        }
                                        {item.midTitle && (<small>{item.midTitle}</small>)}
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
                <div className="box esc" onClick={() => this.logout()}>退出登录</div>
            </div>
        )
    }
}