import React from 'react'
import Head from './head'
import Body from './body'
import './index.less'

export default class Headline extends React.Component{
    render(){
        return (
            <article className="headline-wrapper">
                <Head></Head>
                <Body></Body>
            </article>
        )
    }
}