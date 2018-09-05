import React from 'react'
import Icon from 'components/Icon-svg'
import { withRouter } from 'react-router-dom'
import connect from 'connect'

@connect
@withRouter
export default class Body extends React.Component{
    goService(path){
        const {state:{user:{user:{username}}},showAlert,history} = this.props;
        if(!username){
            showAlert({
                content:'请先登录!',
                success:() => {
                    history.slideStatus = 'top',
                    history.push('/login')    
                }
            })
        }else{
            history.slideStatus = 'left';
            history.push(path)
        }
    }
    render(){
        const {state:{account:{serviceList}}} = this.props;
        return (
            <section className="body-wrapper">
                {
                    serviceList.map((item,index) => (
                        <div className={`li ${item.className}`} onClick={() => this.goService(item.path)} key={index}>
                            <div className="li-title">{item.title}</div>
                            {
                               item.midTitle ? (
                                    <div className="df-c">
                                        <span className="li-midTitle">{item.midTitle}</span>
                                        <Icon iconName={item.icon}></Icon>
                                    </div>
                               ) : (
                                <Icon iconName={item.icon}></Icon>
                               )
                            }
                        </div>
                    ))
                }
                
            </section>
        )
    }
}