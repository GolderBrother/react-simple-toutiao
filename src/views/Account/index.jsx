import React from 'react';
import Head from './head';
import Body from './body';
import FooterBar from 'components/FooterBar'
import { withRouter } from 'react-router-dom'
import './index.less'

@withRouter
export default class Account extends React.Component{
    render(){
        return (
            <article className="account-wrapper">
                <div className="account-container">
                    <Head></Head>
                    <Body></Body>
                </div>
                {/* <FooterBar></FooterBar> */}
            </article>
        )
    }
}