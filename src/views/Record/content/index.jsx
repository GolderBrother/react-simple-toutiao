import React from 'react'
import connect from 'connect';
import { withRouter } from 'react-router-dom'
import PullLoad from 'components/PullLoad'


@connect
@withRouter
export default class Content extends React.Component {
    state = {
        hasMore: true
    }
    // 加载
    handleLoad() {
        const { getRecordList, state: { record: { types, index: i } } } = this.props;
        const { title } = types[i];
        getRecordList({ title })
    }
    // 上拉刷新
    refreshLoad() {
        const { refreshRecordList, state: { record: { types, index: i } } } = this.props;
        const title = types[i];
        refreshRecordList({ title });
    }
    render() {
        const { type, className, history } = this.props;
        const { length = 0 } = type.list;
        return (
            <section className={`swiper-box ${className}`}>
                <p className="tip">昨天总共阅读了{length}篇文章</p>
                <PullLoad className="pullload-wrapper" handleLoad={() => this.handleLoad} handleRefresh={() => this.handleRefresh}>
                    <ul>
                        {
                            type.list.map((item, index) => (
                                <li className="item" key={index} onClick={() => { history.slideStatus = 'left'; history.push(`/article/${item.id}`) }}>
                                    {
                                        item.images.length === 0 ? (
                                            <div>
                                                <h4>{item.title}</h4>
                                                <p className="wes-1">{item.intro}</p>
                                                <div className="df-sb">
                                                    <div className="small-box">
                                                        <span>{item.source}</span>
                                                        <span>评论: {item.comment}</span>
                                                        <span>{item.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : item.images.length === 1 ? (
                                            <div className="df-sb">
                                                <div className="item-l">
                                                    <h4>{item.title}</h4>
                                                    <p className="wes-1">{item.intro}</p>
                                                    <div className="df-sb">
                                                        <div className="small-box">
                                                            <span>{item.source}</span>
                                                            <span>评论: {item.comment}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item-r">
                                                    <img src={item.images[0]} alt='' />
                                                </div>
                                            </div>
                                        ) : (
                                                    <div>
                                                        <div className="item-t">
                                                            <h4>{item.title}</h4>
                                                            <p className="wes-1">{item.intro}</p>
                                                        </div>
                                                        <div className="item-b df-sb">
                                                            <div className="df-sb">
                                                                <div className="small-box">
                                                                    <span>{item.source}</span>
                                                                    <span>评论: {item.comment}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="df-sb">
                                                            {
                                                                item.images.map((img, i) => (
                                                                    <img src={img} alt={img} key={i} style={{ width: item.images.length === 2 ? '40%' : '25%' }} />
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </PullLoad>
            </section>
        )
    }
}