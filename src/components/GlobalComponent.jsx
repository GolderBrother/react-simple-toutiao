import React from 'react'
import Alert from 'components/Alert'
import DefaultLoading from 'components/DefaultLoading'
import connect from 'connect'

@connect
export default class GlobalComponent extends React.Component{
    render(){
        const { alert:{show,content,success},loading } = this.props.state.config;
        return (
            <div className="global-component">
                <Alert show={show} content={content} success={success} />
                <DefaultLoading show={loading.show}/>
            </div>
        )
    }
}