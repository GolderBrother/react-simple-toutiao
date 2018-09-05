import React from 'react';
import PullLoad from 'components/PullLoad'
import Icon from 'components/Icon-svg'
import connect from 'connect'
import { withRouter } from 'react-router-dom'

@connect
@withRouter
export default class HeadlineBody extends React.Component {
    state = {
        pageindex: 1
    }
    // 组件预挂载前先加载
    componentWillMount(){
        const { getHeadLineList,state:{headline:{hasMore}} } = this.props;
        console.log(getHeadLineList,hasMore)
        if(!hasMore) return;
        getHeadLineList({
            pageindex:this.state.pageindex
        })
        console.log('componentWillMount')
    }
    // 加载
    handleLoad() {
        let { pageindex } = this.state;
        pageindex++;
        this.setState({
            pageindex
        })
        this.props.getHeadLineList({
            pageindex: this.state.pageindex
        })
    }
    // 刷新
    handleRefresh() {
        this.setState({
            pageindex: 1
        });
        this.props.refreshHeadLineList({
            pageindex: this.state.pageindex
        })
    }
    // 属性反转
    attrReverse(item,attr){
        item[attr] = !item[attr];
        // 重新渲染
        this.props.renderHeadLineList();
    }
    // 点赞
    handleClickLike(item){
        item['islike'] = !item['islike'];
        if(item['islike']){
            // 赞
            item.like_num++
        }else{
            // 取消赞
            item.like_num--
        }
        // 重新渲染
        this.props.renderHeadLineList();
    }
    // 查看详情
    goDetails(item){
        const { id } = item;
        const { history } = this.props;
        history.slideStatus = 'left';
        history.push(`/article/${id}`);
    }
    render() {
        const { headlinelist, hasMore } = this.props.state.headline;
        return (
            <section className="headline-body-wrapper">
                <PullLoad handleLoad={(e) => this.handleLoad()} handleRefresh={(e) => this.handleRefresh()} hasMore={hasMore}>
                    <div className="header-box">
                        {
                            headlinelist.map((item, index) => (
                                <section className="item border-half-top" key={index}>
                                    <div className="item-t df-sb">
                                        <div className="item-t-l df-sb">
                                            <div className="avatar bg-cover-all" style={{backgroundImage:`url(${item.avatar})`}}></div>
                                            <div className="info">
                                                <div className="name">{item.name}</div>
                                                <div className="info-box">
                                                    <time>{item.time}小时以前</time>
                                                    &nbsp;·
                                                    <span>{item.tag}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="item-t-r" onClick={(e) => this.attrReverse(item,'attention')}>
                                            {
                                                item.attention ? (
                                                    <span className="like-y">已关注</span>
                                                ) : (
                                                    <span className="like-n">关注</span>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="item-m" onClick={(e) => this.goDetails(item)}>
                                        <p className="item-m-text">{item.intro}</p>
                                        <div className="item-m-images">
                                            {
                                                item.images.map((img,index2,item) => {
                                                    const imgLength = item.length;
                                                    return (<img src={img} className={imgLength === 1 ? 'one' : imgLength === 2 ? 'two' : 'three'} key={index2} alt={item.img} />)
                                                })
                                            }
                                        </div>
                                        <span className="item-m-readnum">
                                            {item.read_num}阅读
                                        </span>
                                    </div>
                                    <div className="item-b df-c">
                                        <div className="item-b-icon df-c">
                                            <Icon iconName="exchangejiaohuan"></Icon>
                                            <span>{item.opinion_num}</span>
                                        </div>
                                        <div className="item-b-icon df-c">
                                            <Icon iconName="comment"></Icon>
                                            <span>{item.comment_num}</span>
                                        </div>
                                        <div className={`item-b-icon df-c ${item['islike'] ? 'item-b-icon-active' : ''}`} onClick={(e) => this.handleClickLike(item)}>
                                            <Icon iconName="zan" className="like"></Icon>
                                            <span>{item.like_num}</span>
                                        </div>
                                    </div>
                                </section>
                            ))
                        }
                    </div>
                </PullLoad>
            </section>
        )
    }
}