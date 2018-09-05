import React from 'react'
import PullLoad from 'components/PullLoad'
import connect from 'connect';
import { withRouter } from 'react-router-dom';

@connect
@withRouter //装饰器，获取location history 等路由相关信息
export default class Body extends React.Component {
    state = {
        keyword: '',
        pageindex: 1,
        keywordList: []
    }
    // 上拉加载
    async handleLoad() {
        console.log('handleLoad')
        const { keyword, pageindex } = this.state;
        const { getSearchList } = this.props;
        await getSearchList({
            keyword,
            pageindex
        })
    }
    // 下拉刷新
    async handleRefresh() {
        const { keyword, pageindex } = this.state;
        const { refreshSearchList } = this.props;
        await refreshSearchList({
            keyword,
            pageindex
        })
    }
    // 猜你想搜 搜索
    async getSearchData(keyword) {
        const { getSearchList,showLoading,hideLoading } = this.props;
        const { pageindex } = this.state;
        this.setState({
            keyword
        });
        showLoading();
        await getSearchList({
            keyword,
            pageindex
        });
        hideLoading();
    }
    // 查看详情
    goDetail(e,item){
        console.log(e)
        const { history } = this.props;
        console.log(this.props)
        history.slideStatus = "left"; 
        history.push(`/article/${item.id}`)
    }
    componentWillMount(){
        const { keywordList } = this.props.state.search;
        this.setState({
            keywordList
        })
    }
    // 判断是数组还是对象
    switchType(obj){
        return Object.prototype.toString.call(obj).slice(8,-1);
    }
    render() {
        const { keywordList } = this.state;
        const { state: { search: { searchList, hasMore } } } = this.props;
        console.log(searchList,searchList.length)
        return (
            <div className="search-body-wrapper">
                <div className="search-body-container">
                    {
                        searchList.length < 1 ? (
                            <div className="guess">
                                <div className="tip">猜你想搜的</div>
                                <ul className="search-menu border-half cf">
                                    {
                                        keywordList.map((keyword, index) => (
                                            <li className="fl border-half" key={index} onClick={() => this.getSearchData(keyword)}>
                                                {keyword}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ) : (
                                <PullLoad className="search-box" handleLoad={() => this.handleLoad()} handleRefresh={() => this.handleRefresh()} hasMore={hasMore}>
                                    <div className="search-list">
                                        {
                                            (this.switchType(searchList[0]) === "Object" ? searchList : searchList[0]).map((item, index) => (
                                                <section className="item border-half-bottom" key={index} onClick={(e) => this.goDetail(e,item) }>
                                                    {
                                                        item.images && (item.images.length === 0 ? (
                                                            <div>
                                                                <h4>{item.title}</h4>
                                                                <p>{item.intro}</p>
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
                                                                    <p>{item.intro}</p>
                                                                    <div className="df-sb">
                                                                        <div className="small-box">
                                                                            <span>{item.source}</span>
                                                                            <span>评论: {item.comment}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="item-r">
                                                                    <img src={item.images[0]} alt="" />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                 <div className="item-t">
                                                                    <h4>{item.title}</h4>
                                                                    <p>{item.intro}</p>
                                                                </div>
                                                                <div className="item-b df-sb">
                                                                    {
                                                                        item.images.map((img, index) => (
                                                                            <img src={img} key={index} alt={img} style={{ width: item.images.length === 2 ? '40%' : '25%' }} />
                                                                        ))
                                                                    }
                                                                </div>
                                                                <div className="item-f">
                                                                    <div className="small-box">
                                                                        <span>{item.source}</span>
                                                                        <span>评论: {item.comment}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </section>
                                            ))
                                        }
                                    </div>
                                </PullLoad>
                            )
                    }

                </div>
            </div>
        )
    }
}