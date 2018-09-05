import React from 'react'
import Icon from 'components/Icon-svg';
import connect from 'connect'
import { withRouter } from 'react-router-dom'
@connect
@withRouter
export default class Head extends React.Component{
    state = {
        value:"",
        pageindex:1
    }
    handleChange(value){
        this.setState({
            value
        })
    }
    // 下拉加载
    async getSearchData(){
        const { value,pageindex } = this.state;
        const { refreshSearchList } = this.props;
        await refreshSearchList({
            keyword:value,
            pageindex
        })
        this.setState({
            value:""
        })
    }
    render(){
        const { value } = this.state;
        // 调用history的goBack方法会返回上一历史记录,源于 装饰器:withRouter 的作用
        const { goBack } = this.props.history;
        return (
            <div className="search-head-wrapper">
                <div className="search-head-container df-sb">
                    <div className="search">
                        <Icon iconName="2fangdajing" className="search-icon"></Icon>
                        <input className="search-input" type="text" placeholder="搜索些啥呢..." value={value}
                            onChange={e => this.handleChange(e.target.value)}
                            onKeyDown={e => e.keyCode === 13 ? this.getSearchData : null}
                            onBlur={() => this.getSearchData}
                        />
                    </div>
                    {
                        value ? (
                            <div className="search-btn" onClick={() => this.getSearchData()}>确定</div>
                        ) : (
                            <div className="close search-btn" onClick={() => goBack()}>取消</div>
                        )
                    }
                </div>
            </div>
        )
    }
}