import React from 'react'
import PullLoad from 'components/PullLoad'
import Icon from 'components/Icon-svg'
import connect from 'connect'
import './index.less'
@connect
export default class Video extends React.Component {
    state = {
        hasMore: false,
        pageindex: 1
    }
    componentWillMound() {
        const { getVideoList, state: { video: { hasMore } } } = this.props;
        const { pageindex } = this.state;
        if (!hasMore) return;
        getVideoList({
            pageindex
        })
    }
    componentDidMount() {
        this.handleRefresh()
    }
    // 刷新
    handleRefresh() {
        this.setState({
            pageindex: 1
        })
        return this.props.refreshVideoList({
            pageindex: 1
        })
    }
    // 加载
    handleLoad() {
        let { pageindex } = this.state;
        pageindex++;
        this.setState({
            pageindex
        })
        return this.props.getVideoList({
            pageindex
        })
    }
    // 绘制canvas 模拟视频播放 
    drawVideo(index) {
        const video = document.querySelectorAll('video')[index],
            ctx = document.querySelectorAll('canvas')[index].getContext('2d');
        video.play();
        const w = document.querySelectorAll('.video')[index].clientWidth || 320,
            h = document.querySelectorAll('.video')[index].clientHeight || 176;
        // 绘制图片的帧率
        const fps = 1000 / 30;
        // 监听video播放，添加定时器，每 fps 毫秒 进行一次canvas绘制
        video.addEventListener('play', () => {
            setInterval(() => {
                ctx.drawImage(video, 0, 0, w, h);
            }, fps)
        });
    }
    // 播放
    play(index, item) {
        // 设置playBol，隐藏标题，时间和播放按钮
        item.playBol = true;
        this.drawVideo(index);
        // 重新渲染
        this.props.renderVideoList()
    }
    // 暂停
    pause(index, item) {
        // 设置playBol，显示标题，时间和播放按钮
        item.playBol = false;
        // 暂停video(video元素)播放 
        document.querySelectorAll('video')[index].pause();
        // 重新渲染
        this.props.renderVideoList();
    }
    // 切换属性值
    attrReverse(item, attriute) {
        item[attriute] = !item[attriute];
        // 重新渲染
        this.props.renderVideoList()
    }
    render() {
        const { hasMore, videoList } = this.props.state.video;
        return (
            <PullLoad handleLoad={this.handleLoad.bind(this)} handleRefresh={this.handleRefresh.bind(this)} hasMore={hasMore}>
                <article className="video-wrapper">
                    <div className="video-container">
                        {
                            videoList.map((item, index) => (
                                <section key={index} className="item border-half-bottom">
                                    <div className="video">
                                        <video src={item.video}></video>
                                        <div className="canvas-video bg-cover" style={{ backgroundImage: `url(${item.images})` }}>
                                            {/* 利用canvas来调用video播放，正常操作 */}
                                            <canvas onClick={(e) => { this.pause(index, item) }}></canvas>
                                        </div>
                                        {
                                            !item.playBol ? (
                                                <div>
                                                    <div className="title">
                                                        <h4>{item.title}</h4>
                                                        <small>{item.video_num}次播放</small>
                                                    </div>
                                                    <div className="play" onClick={() => { this.play(index, item) }}>
                                                        <Icon iconName="play" className="play"></Icon>
                                                    </div>
                                                    <time className="time">{item.time}</time>
                                                    <div className="avatar bg-cover-all" style={{ backgroundImage: `url(${item.image})` }}></div>
                                                </div>
                                            ) : ''
                                        }
                                    </div>
                                    <div className="intro df-sb">
                                        <div className="source">{item.source}</div>
                                        <div className="box df-c">
                                            <div onClick={(e) => { this.attrReverse(item, 'attention') }}>
                                                {
                                                    item.attention ? (
                                                        <div>已关注</div>
                                                    ) : (
                                                            <div>
                                                                <Icon iconName="attention"></Icon>
                                                                <span>关注</span>
                                                            </div>
                                                        )
                                                }
                                            </div>
                                            <div>
                                                <Icon iconName="custom-comment"></Icon>
                                                <span>{item.comment_num || '评论'}</span>
                                            </div>
                                            <div>
                                                <Icon iconName="More"></Icon>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            ))
                        }
                    </div>
                </article>
            </PullLoad>
        )
    }
}
