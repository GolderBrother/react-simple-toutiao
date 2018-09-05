import React,{ Component } from 'react'
import Icon from 'components/Icon-svg'
import { withRouter } from 'react-router-dom'
import connect from 'connect'
import './index.less'

// connect 将各个组件通过redux state联系到一起
@connect 
@withRouter
export default class FooterBar extends React.Component{
    tabView = (path,index) => {
      const { setFooterBarIndex, history} = this.props;
      setFooterBarIndex(index)
      history.push(path)
    }
    render(){
        const {location:{pathname},state:{user:{footerBarList}}} = this.props;
        return (
          <footer className="df-c footerbar-wrapper">
            <ul className="cf">
            {
              footerBarList.map((item,index) => (
                <li key={index} className={item.path === pathname ? 'active' : ''} onClick={(e) => this.tabView(item.path,index)}>
                  <Icon iconName={item.icon}></Icon>
                  <div>{item.title}</div>
                </li>
              ))
            }
            </ul>
          </footer>  
        )
    }
}