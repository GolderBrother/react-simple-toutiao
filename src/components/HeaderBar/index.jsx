import React from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import connect from 'connect';
import Icon from 'components/Icon-svg'
import './index.less';
// withRouter可以用来给组件注入router相关的一些参数,可以拿到需要的路由信息
@withRouter
@connect
export default class HeaderBar extends React.Component {
    render(){
        const logoSrc = require('src/assets/images/logo.png');
        const { history } = this.props;
        return (
            <header className="headerbar-wrapper df-sb">
                <div className="logo df-c">
                    <img src={ logoSrc } alt="logo"/>
                </div>
                <div className="search">
                    <Icon iconName="2fangdajing" className="search-icon"></Icon>
                    <input type="text" placeholder="搜索些啥呢..." readOnly onClick={e => {
                        history.slideStatus = 'left';
                        history.push('/search');
                    }}/>
                </div>
            </header>
        )
    }
}
