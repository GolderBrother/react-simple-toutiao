import React from 'react';
import TopBar from './topBar';
import Content from './content';
import Swiper from 'react-id-swiper';
// 用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来
import connect from 'connect';
import './index.less';

@connect  // 将state映射到 UI 组件的参数(props)
export default class Home extends React.Component {
    state = {
        swiper:null
    }
    componentDidMount(){
      // 获取swiper实例对象
      const { swiper } = this.refs['home-box-swiper'];
      this.setState({
        swiper
      }, () => {
        this.setActive(0);
      }) 
    }
    // 切换结束时，获取现在是第几个slide
    slideChangeTransitionEnd(){
      const {state:{swiper:{activeIndex}}} = this;
      this.setActive(activeIndex);
    }
    // 设置newsIndex
    setActive(index){
      this.props.setNewsIndex(index);
      this.getListOfNewsData(index);
    }
    // 根据newsIndex 获取 newsList
    getListOfNewsData(newsIndex){
      const {getListOfNews,state:{home:{newsList}}} = this.props;
      getListOfNews(newsList[newsIndex],{newsIndex,newsList});
    }
    render(){
      const { newsList,newsIndex } = this.props.state.home;
      const { swiper } = this.state;
      swiper && swiper.slideTo(newsIndex);
      return (
          <div className="home-container">
              <TopBar />
              <div className="home-box">
                <Swiper ref="home-box-swiper" on={{slideChangeTransitionEnd:this.slideChangeTransitionEnd.bind(this)}}>
                  {
                    newsList.map((news,index) => (
                      <div key={ index } >
                        <Content news={ news } />
                      </div>
                    ))
                  }
                </Swiper>
              </div>
          </div>
      )
    }
}

