import React from 'react';
import PropTypes from 'prop-types';
// 引入withRouter之后,就可以使用编程式导航进行点击跳转,
import { withRouter } from 'react-router-dom';
import Icon from 'components/Icon-svg'
import './index.less'

@withRouter
export default class TitleBar extends React.Component {
    // propTypes的类型检测
    static propTypes = {
        title: PropTypes.string
    }
    static defaultProps = {
        title: '今日头条'
    }
    render() {
        // 调用history的goBack方法会返回上一历史记录,调用history的push方法会跳转到目标页
        const { title, history: { goBack } } = this.props;
        return (
            <section className="title-bar-wrapper">
                <div className="head">
                    <Icon iconName="jiantou" className="back" onClick={() => goBack()}></Icon>
                    <h2>{title}</h2>
                </div>
            </section>
        )
    }
}
