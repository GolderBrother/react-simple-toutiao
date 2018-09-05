import React, { Component } from 'react';
import PullLoad from 'components/PullLoad'
import connect from 'connect';
import { withRouter } from 'react-router-dom'

const NoneImages = ({ item }) => (
  <div>
    <h4>{item.title}</h4>
    <p className="wes-3">{item.intro}</p>
    <div className="df-sb">
      <div className="small-box">
        <span>{item.source}</span>
        <span>评论: {item.comment}</span>
        <span>{item.time}</span>
      </div>
    </div>
  </div>
)

const ImagesOne = ({ item }) => (
  <div className="df-sb">
    <div className="item-l">
      <h4>{item.title}</h4>
      <p className="wes-3">{item.intro}</p>
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
)

const ImagesMore = ({ item }) => (
  <div>
    <div className="item-t">
      <h4>{item.title}</h4>
      <p>{item.intro}</p>
    </div>
    <div className="item-b df-sb">
      {
        item.images.map((img,index) => (
          <img src={img} key={index} alt={img} style={{ width: item.images.length === 2 ? '40%' : '25%' }} />
        ))
      }
    </div>
    <div className="item-df-sb">
      <div className="small-box">
        <span>{item.source}</span>
        <span>评论: {item.comment}</span>
      </div>
    </div>
  </div>
)

@connect
@withRouter
export default class Content extends Component {
  state = {
    hasMore: true
  }
  // 加载
  handleLoad() {
    const { getListOfNews, state: { home: { newsList, newsIndex } } } = this.props;
    return getListOfNews(newsList[newsIndex], { newsList, newsIndex, hasMore: this.state.hasMore })
  }
  // 刷新
  handleRefresh() {
    const { refreshListOfNews, state: { home: { newsList, newsIndex } } } = this.props;
    return refreshListOfNews(newsList[newsIndex], newsIndex);
  }
  // 查看详情
  goDetail(item){
    const { history } = this.props;
    history.slideStatus = 'left';
    history.push(`/article/${item.id}`);
  }
  render() {
    const { news } = this.props;
    return (
      <section className="swiper-box">
        <PullLoad handleLoad={() => this.handleLoad()} handleRefresh={() => this.handleRefresh()} hasMore={news.hasMore}>
          <ul>
            {
              news.list && news.list.map((item, index) => (
                <li key={index} className="item border-half-bottom" onClick={(e) => this.goDetail(item)}>
                  {
                    item.images && (item.images.length === 0 ? <NoneImages item={item} /> : item.images.length === 1 ? <ImagesOne item={item} /> : <ImagesMore item={item} />)
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