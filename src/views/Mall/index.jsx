import React from 'react'
import connect from 'connect'
import TitleBar from 'components/TitleBar'
import Icon from 'components/Icon-svg'
import { mallData } from 'reducers/data'
import './index.less'

@connect //装饰器 连接UI组件的容器 才可以使用props上面的redux的action
export default class Mall extends React.Component {
  state = {
    recommendData: {},
    serviceList:{},
    tipText: '客服电话服务工作时间：看心情'
  }
  geService(title){
    const { showAlert } = this.props;
    showAlert({
      content:`暂未开放${title}模块`
    })
  }
  componentWillMount(){
    const { recommendData={},serviceList={} } = mallData;
    this.setState({
      recommendData,
      serviceList
    })

  }
  render() {
    const { recommendData, serviceList, tipText } = this.state;
    return (
      <div className="mall-wrapper">
        <TitleBar />
        <div className="recommend">
          <h4 className="recommend-title">{recommendData.title}</h4>
          <div className="recommend-box df-sb">
            {
              recommendData.list.map((item, index) => (
                <div className="item" key={index}>
                  <h5>{item.text}</h5>
                  <span>{item.subText}</span>
                </div>
              ))
            }
          </div>
        </div>
        <div className="service-box border-half">
            <h4>{serviceList.title}</h4>
            {
              serviceList.list.map((item,index) => (
                <div className="service-item df-sb border-half-bottom" key={index} onClick={() => this.geService(item.title)}>
                  <span>{item.title}</span>
                  <Icon iconName="arrow" className="arrow"></Icon>
                </div>
              ))
            }
        </div>
        <div className="tip">{tipText}</div>
      </div>
    )
  }
}