import React from 'react'
import TextComponent from '../text';
import connect from 'connect';
import { withRouter } from 'react-router-dom'
import Icon from 'components/Icon-svg'
@connect
@withRouter
export default class HeadlineHead extends React.Component{
    state = {
        list:[
            {icon:'24',title:'文字'},
            {icon:'tupian',title:'图片'},
            {icon:'shipin',title:'视频'}
        ],
        showTextBol:false
    }
    show(title){
        const { state:{user:{user}},history,showAlert } = this.props;
        console.log(this.props.state.user)
        if(!user.username){
            showAlert({
                content:'请先登录!',
                success:() => {
                    history.slideStatus = 'top';
                    history.push('/login')
                }
            })
        }
        if(title === '文字'){
            this.setState({
                showTextBol:true
            })
        }else if(title === '图片' || title === '视频' ){
            showAlert({
                content:`${title}模块暂未完成!!!`
            })
        }else{
            return;
        }
    }
    close(){
        this.setState({
            showTextBol:false
        })
    }
    render(){
        const { list,showTextBol } = this.state;
        return (
            <section className="headline-head-wrapper">
                <div className="headline-top-bar df-c">
                    {
                        list.map((item,index) => (
                            <div className="item border-half-right" key={index} onClick={(e) => this.show(item.title)}>
                                <Icon iconName={ item.icon }></Icon>
                                <span>{ item.title }</span>
                            </div>
                        ))
                    }
                    <TextComponent className={showTextBol ? 'text-active' : ''} onClose={(e) => this.close()}></TextComponent>
                </div>
            </section>
        )
    }
}