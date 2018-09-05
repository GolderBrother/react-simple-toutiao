import React from 'react';
import connect from 'connect';
import Swiper from 'react-id-swiper';
import TopBarBox from 'components/TopBarBox';
import './index.less'
// React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。
@connect
export default class TopBar extends React.Component {
    state = {
        swiper:{},
        showTopBarBox:false
    }
    componentWillMount(){
        const { newsIndex=1 } = this.props.state.home;
        this.getNewsList(newsIndex);
    }
    componentDidMount(){
        const { swiper } = this.refs['top-bar-swiper']
        const index = this.props.state.home.newsIndex;
        this.setState({
            swiper:swiper
        })
        swiper.slideTo((index-2 >= 0 ? index-2 : 0),500,false)
    }
    // 切换新闻频道，获取新闻
    async setActiveTab(index){
        this.props.setNewsIndex(index)
        this.state.swiper.slideTo((index-2 >= 0 ? index-2 : 0),500,false)
        await this.getNewsList(index)
    }
    async getNewsList(newsIndex){
        try {
            const {getListOfNews,state:{home:{newsList}}} = this.props;
            // 获取当前news的内容
            await getListOfNews(newsList[newsIndex],{newsList,newsIndex});
            console.log(this.props.state.home.newsList[newsIndex].list)
        } catch (error) {
            const { showAlert } = this.props
            showAlert({
                content:error.message
            })
        }
    }
    openBox(){
        this.setState({
            showTopBarBox:true
        })
    }
    closeBox(){
        console.log('closeBox')
        this.setState({
            showTopBarBox:false
        })
    }
    render(){
        const { showTopBarBox } = this.state;
        const { newsList,newsIndex } = this.props.state.home;//redux state
        return (
            <div className="home-topbar-wrapper border-half-bottom">
                <div className="top-menu-bar">
                    <Swiper slidesPerView={6} ref="top-bar-swiper">
                       {
                           newsList && newsList.map((news,index) => (
                               <div className={`${newsIndex === index ? 'active' : ''}`} onClick={() => this.setActiveTab(index)} key={index} >{news.title}</div>
                            ))
                       } 
                    </Swiper>
                </div>
                <a className="top-menu-more-btn df-c" href="javascript:void(0);" onClick={() => this.openBox()}>
                    <i className="list-shadow"></i>
                    <span className="cross"></span>
                </a>
                <TopBarBox className={`${showTopBarBox?'top-bar-active':''}`} closeBox={() => this.closeBox()}/>
            </div>
        )
    }
}
