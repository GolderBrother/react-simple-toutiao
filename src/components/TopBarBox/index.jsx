import React from 'react';
import Icon from 'components/Icon-svg'
import connect from 'connect'
import './index.less'
// 由于没有服务层调用数据，因此这边的数据暂时来源于redux的reducer中
import { news } from 'reducers/data'
@connect
export default class TopBarBox extends React.Component {
    render() {
        const { state: { home: {newsList} }, closeBox, className, delNews, addNews } = this.props;
        // 对比我的频道，过滤掉相同的数据
        const allNewsList = news.filter(news => {
            return !newsList.some(n => news.title === n.title)
        })
        return (
            <div className={`top-bar-box ${className}`}>
                <div className="close" onClick={() => closeBox()}>
                    <Icon iconName="close" className="close"></Icon>
                </div>
                <div className="self-box">
                    <div className="title df-sb">
                        <div className="title-l">
                            <span>我的频道</span>
                            <small>点击删除以下频道</small>
                        </div>
                    </div>
                    <ul className="cf">
                        {
                            newsList.map((item, index) => (
                                <li className="fl" onClick={() => delNews(item) } key={index}>
                                    <a href="javascript:void(0);">{ item.title }</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="recommend-box">
                    <div className="title df-sb">
                        <div className="title-l">
                            <span>推荐频道</span>
                            <small>点击添加以下频道</small>
                        </div>
                    </div>
                    <ul className="cf">
                        {
                            allNewsList.map((item, index) => (
                                <li className="fl" key={index} onClick={() => { addNews(item) }}>
                                    <a href="javascript:void(0);">{ item.title }}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
