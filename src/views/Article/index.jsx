import React from 'react';
import { withRouter } from 'react-router-dom'
import connect from 'connect'
import Icon from 'components/Icon-svg'
import CircleLoading from 'components/CircleLoading'
import './index.less'
@connect
@withRouter
export default class Article extends React.Component {
    state = {
        loading: false
    }
    async componentWillMount(){
        const { match:{params:{id}},getArticleInfo,state:{article:{articleInfo}} } = this.props
        // 当前id 不获取
        if(articleInfo.id === id) return;
        // 开启加载状态
        this.setState({
            loading:true
        })
        await getArticleInfo({id})
        //关闭加载状态
        this.setState({
            loading:false
        })
    }
    getMore() {
        const { showAlert } = this.props;
        showAlert({
            content: "没有更多信息哦！"
        })
    }
    // 属性置反
    toggleAttr(articleInfo, attr) {
        articleInfo[attr] = !articleInfo[attr];
        // 重新渲染ArticleInfo
        this.props.renderArticleInfo();
    }
    // 点赞
    handleLike(articleInfo) {
        articleInfo.isLike = !(articleInfo.isLike);
        articleInfo.isLike ? articleInfo.like_num++ : articleInfo.like_num--;
        // 重新渲染HeadLineList
        this.props.renderHeadLineList(); 
    }
    render() {
        const { loading } = this.state;
        const { history: { goBack }, state: { article: { articleInfo } } } = this.props;
        return (
            <article className="article-wrapper">
                <div className="article-head-wrapper">
                    <header className="head df-sb border-half-bottom">
                        <Icon iconName="jiantou" onClick={() => goBack()}></Icon>
                        <Icon iconName="More" onClick={() => this.getMore()}></Icon>
                    </header>
                </div>
                {
                    (!this.state.loading && articleInfo) ? (
                        <div className="article-body-wrapper">
                            <div className="article-desc">
                                <h2>{articleInfo.title}</h2>
                                <h3>ID: {articleInfo.id}</h3>
                                <div className="info df-sb">
                                    <div className="info-l df-sb"> 
                                        <div className="avatar bg-cover-all" style={{ backgroundImage: `url(${articleInfo.avatar})` }}></div>
                                        <div className="info-other">
                                            <h6>{articleInfo.source}</h6>
                                            <time>{articleInfo.time}小时前</time>
                                        </div>
                                    </div>
                                    <div className={articleInfo.attention ? "like-y" : "like-n border-half"} onClick={() => this.toggleAttr(articleInfo, "attention")}>
                                        {articleInfo.attention ? '关注' : '已关注'}
                                    </div>
                                </div>
                            </div>
                            <div className="article-content">
                                <p className="article-intro">
                                    {articleInfo.intro}
                                </p>
                            </div>
                            <div className="article-footer"> 
                                <div className="tags">
                                    <ul>
                                        {
                                            articleInfo.tags && articleInfo.tags.map((tag, i) => (
                                                <li className="tag" key={i}>{tag}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className="like-container df-sa">
                                    <div className={`like df-c ${articleInfo.isLike ? 'like-y' : ''}`} onClick={() => this.handleLike(articleInfo)}>
                                        <Icon iconName="zan" className="like"></Icon>
                                        <span>{articleInfo.like_num}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="loading-wrapper">
                          <CircleLoading></CircleLoading>  
                        </div>
                    )
                }
            </article>
        )
    }
}