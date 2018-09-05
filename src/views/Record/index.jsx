import React from 'react'
import TitleBar from 'components/TitleBar'
import Swiper from 'react-id-swiper'
import Content from './content';
import connect from 'connect'
import { withRouter } from 'react-router-dom'
import './index.less'

@connect
@withRouter
export default class Record extends React.Component {
    state = {
        swiper: null
    }
    // 控制swiper切换
    activeTab(index) {
        const { swiper } = this.state;
        const { history } = this.props;
        history.push(`/record/${index}`);
        swiper && swiper.slideTo(index);
        this.getData(index);
    }
    componentWillMount() {
        // 挂载前获取路由参数 this.props.params.xxx
        const { match: { params: { type: index } },setRecordIndex } = this.props;
        console.log(index);
        this.getData(index*1);
    }
    componentDidMount() {
        // 获取swiper实例 初始化切换Tab
        const { swiper } = this.refs['record-swiper'];
        const { index } = this.props.state.record;
        this.setState({
            swiper
        })
        swiper.slideTo(index);
    }
    // 回调函数，过渡动画结束后执行，即滑块活动停止后执行
    slideChangeTransitionEnd() {
        // 获取现在是第几个slide
        const { activeIndex } = this.state.swiper;
        this.getData(activeIndex)
    }
    // 获取数据
    async getData(i) {
        const { showAlert, showLoading, hideLoading, getRecordList, setRecordIndex, state: { record: { types } } } = this.props;
        try {
            console.log('tabIndex:'+i)
            // 设置类型索引值
            setRecordIndex(i);
            // 如果已有数据，就不再获取
            // console.log(types[i].list)
            // if (types[i].list && types[i].list.length > 0) return;
            showLoading();
            const { title } = types[i];
            await getRecordList({ title });
            console.log(this.props.state.record.types)
            hideLoading();
        } catch (error) {
            console.error(error.message)
            hideLoading();
            // showAlert({
            //     content:"程序出错",
            // })
        }
    }
    render() {
        const { types: recordTypes, index: tabIndex } = this.props.state.record;
        return (
            <div className="record-wrapper">
                <TitleBar title="收藏/历史" />
                <div className="tabs df-c border-half-top">
                    {
                        recordTypes.map((tab, index) => (
                            <div onClick={() => this.activeTab(index)} className={`tab ${tabIndex === index ? 'tab-active' : ''}`} key={index}>{tab.title}</div>
                        ))
                    }
                </div>
                <div className="record-content">
                    <Swiper ref="record-swiper" on={{ slideChangeTransitionEnd: () => this.slideChangeTransitionEnd }}>
                        {
                            recordTypes.map((type, i) => (
                                <Content type={type} key={i} className={`type ${tabIndex === i} ? 'type-active' : ''`} key={i}></Content>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        )
    }
}