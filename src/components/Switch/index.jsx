import React from 'react'
import connect from 'connect'
import './index.less'

@connect  // 组件通信(props)必须的
export default class Switch extends React.Component{
    state = {
        checked:false
    }
    // 组件初始化挂载获取单选框值
    componentWillMount(){
        const { checked } = this.props;
        this.setState({
            checked
        })
    }
    // 开关
    toggleCheck(){
        const { checked } = this.state;
        this.setState({
            checked:!checked
        },() => {
            const { handleChange } = this.props;
            handleChange && handleChange(this.state.checked)
        })
    }
    render(){
        const { checked } = this.state;
        return (
            <div className="switch-wrapper">
                <label>
                    <input className="mui-switch mui-switch-anim" type="checkbox" checked={checked} readOnly ref="obj" onClick={() => this.toggleCheck()}/>
                </label>
            </div>
        )
    }
}