import React from 'react';
import { Route, Redirect, Switch, HashRouter } from 'react-router-dom'
import { css } from 'glamor'
// 页面间过渡动画中间件
import { AnimatedSwitch } from 'react-router-transition'
import { layoutRouterMap, otherRouterMap, routes } from './config'
import AuthRoute from './authRoute';
import GlobalComponent from 'components/GlobalComponent'
import Layout from 'src/App'
const renderRouteComponent = routes => routes.map((route, index) => {
    if (route.auth) {
        return <AuthRoute key={index} {...route} />
    } else {
        return <Route key={index} {...route} />
    }
    // return <Route key={index} {...route} />
})

// 实例化组件
const LayoutRouter = renderRouteComponent(layoutRouterMap)
const OtherRouter = renderRouteComponent(otherRouterMap)

// 根据路由过渡动画方向，设置对应的起始结束坐标位置
const pageTransitionsFn = status => {
    let obj = {}
    if (status === 'left' || status === 'top') {
        obj = {
            atEnter: { offset: 100, opacity: 0 },
            atLeave: { offset: -100, opacity: 0 },
            atActive: { offset: 0, opacity: 1 }
        }
    } else if (status === 'right' || status === 'bottom') {
        obj = {
            atEnter: { offset: -100, opacity: 0 },
            atLeave: { offset: 100, opacity: 0 },
            atActive: { offset: 0, opacity: 1 }
        }
    } else {
        obj = {
            atEnter: { offset: 0, opacity: 0 },
            atLeave: { offset: 0, opacity: 0 },
            atActive: { offset: 0, opacity: 1 }
        }
    }
    return obj;
}

// CSS in JS风格，名称要用骆驼式命名
const wrapperRule = css`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;

// 根据路由动画方向，设置对应的样式
const mapStylesFn = status => styles => {
    let obj = {};
    if (status === 'left' || status === 'right') {
        obj = {
            transform: `translateX(${styles.offset}%)`, opacity: styles.opacity
        }
    } else if (status === 'top' || status === 'bottom') {
        obj = {
            transform: `translateY(${styles.offset}%)`, opacity: styles.opacity
        }
    }
    return obj;
}

class Router extends React.Component {
    render() {
        return (
            <div className={wrapperRule}>
                <HashRouter>
                    <Route render={({location,history}) => {
                        history.slideStatus = history.slideStatus || (history.action === "POP" ? "right" : history.slideStatus);
                        const pageTransitions = pageTransitionsFn(history.slideStatus);
                        const mapStyle = mapStylesFn(history.slideStatus);
                        history.slideStatus = false;
                        return (
                            <div style={{width:'100%',height:'100%'}}>
                                <GlobalComponent />
                                <AnimatedSwitch  
                                    {...pageTransitions}
                                    runOnMount={ location.pathname === "/" }
                                    className="animate-wrapper"
                                    // exact="true"
                                    mapStyles={ mapStyle }>
                                    { OtherRouter }
                                    <Route render={(props) => {
                                        return (
                                            <Layout {...props} >
                                                <Route 
                                                    render={() => {
                                                        return (
                                                            <Switch>
                                                                {LayoutRouter}
                                                                <Redirect from="*" to="/404" />
                                                            </Switch>
                                                        )
                                                    }}
                                                />
                                            </Layout>
                                        )
                                    }}   />
                                </AnimatedSwitch>
                            </div>
                            
                        )
                    }} />
                </HashRouter>
            </div>
        )
    }
}

export default Router