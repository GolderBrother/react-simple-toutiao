import React from 'react'
import PropTypes from 'prop-types'
import connect from 'connect'
import './index.less'

@connect
export default class Alert extends React.Component{
    // 规定静态类型
    static propTypes = {
        show:PropTypes.bool,
        content:PropTypes.string,
        success:PropTypes.func
    }
    // 默认属性
    static defaultProps = {
        show:false,
        content:"",
        success:function(){}
    }
    state = {
        btn:'确定',
        title:'提示',
        show:false
    }
    // 当props发生变化时执行，初始化render时不执行，在这个回调函数里面，你可以根据属性的变化，
    // 通过调用this.setState()来更新你的组件状态，旧的属性还是可以通过this.props来获取,这里调用更新状态是安全的，并不会触发额外的render调用
    componentWillReceiveProps(nextProps){ 
        this.setState({
            show:nextProps.show
        })
    }
    success(){
        const { success,hideAlert } = this.props;
        this.setState({
            show:false
        });
        hideAlert();
        success && success();
    }
    render(){
        const { btn,title,show } = this.state;
        const { content } = this.props;
        return show ? (
            <div className="dialog-wrapper">
                <div className="dialog-box">
                    <div className="dialog-hd">
                        <strong>{ title }</strong>
                    </div>
                    <div className="dialog-bd">{ content }</div>
                    <div className="dialog-ft border-half-top" onClick={() => this.success()}>{ btn }</div>
                </div>
            </div>
        ) : ''
    }
}