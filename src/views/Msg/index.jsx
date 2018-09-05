import React from 'react'
import EmptyComponent from 'components/Empty'

export default class Msg extends React.Component{
    state = {
        title:"消息通知",
        className:"msg-wrapper"
    }
    render(){
        const {title,className} = this.state;
        return (
            <EmptyComponent title={title} className={className}/>
        )
    }
}