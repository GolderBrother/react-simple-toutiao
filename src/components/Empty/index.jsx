import React from 'react';
import TopBar from 'components/TitleBar'
import NoneData from 'components/NoneData/none-all'
import PropTypes from 'prop-types'

export default class Empty extends React.Component{
    static propTypes = {
        title:PropTypes.string,
        className:PropTypes.string
    }
    static defaultProps = {
        title:'空空如也',
        className:'empty-wrapper'
    }
    render(){
        const { title,className } = this.props;
        return (
            <div className={className}>
                <TopBar title={title}></TopBar>
                <NoneData />
            </div>
        )
    }
}