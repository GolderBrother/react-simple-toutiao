import React from 'react'
import connect from 'connect'
import { Cookie } from 'utils/storage'
@connect
export default class TextComponent extends React.Component{
    state = {
        content:''
    }
    // 初始化获取焦点
    componentDidMount(){
        this.refs.text.focus();
    }
    handleChange(value){
        this.setState({
            // 键值一样(value:value)的可以这样缩写(value)
            content:value
        })
    }
    async send(){
        const { addHeadLineList,onClose,showAlert,showLoading,hideLoading } = this.props;
        try {
            const { content } = this.state;
            if(!content){
                showAlert({
                    content:'请输入你的分享内容!'
                });
                return;
            }
            showLoading();
            const name = Cookie.get('username') || '';
            // await addHeadLineList({intro:content,name:'cd'})
            await addHeadLineList({intro:content,name})
            hideLoading();
            onClose();
        } catch (error) {
            console.error(error.message);
            hideLoading();
            showAlert({
                content:error.message
            });
        }
    }
    render(){
        const { content } = this.state;
        // 获取父节点的关闭发布框函数和className
        const { onClose,className } = this.props;
        return (
            <div className={`text-wrapper ${className}`}>
                <div className="text-title df-sb border-half-bottom">
                    <div className="cancel" onClick={(e) => onClose()}>取消</div>
                    <div className="post" className={content ? 't-active' : 't-r t-disable'} onClick={(e) => this.send()}>发布</div>
                </div>
                <div className="text-content">
                    <textarea name="content" id="content" ref="text" placeholder="分享新鲜事..." onChange={(e) => this.handleChange(e.target.value)} cols="30" rows="10"></textarea>
                </div>
            </div> 
        )
    }
}