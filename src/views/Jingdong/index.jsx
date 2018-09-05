import React from 'react'
import EmptyComponent from 'components/Empty'

export default class Jingdong extends React.Component{
    state = {
        title:"京东特供",
        className:"jd-wrapper"
    }
    render(){
        const {title,className} = this.state;
        return (
            <EmptyComponent title={title} className={className}/>
        )
    }
}