import React from 'react'
import ReactDom from 'react-dom';
import Router from './router'
import Store from './store'

// React-Redux 提供Provider组件，可以让容器组件拿到state
import { Provider } from 'react-redux'
import initReactFastClick from 'react-fastclick'

// 工具类
import './utils/rem'
import './utils/iconfont'
// 监控Redux工具:Redux-devTools
// import DevTools from './utils/devTools'

// 全局样式类
import './styles/index.css'
import './styles/index.less'
// 全站进度条插件 nprogress
import 'nprogress/nprogress.css'


//解决IOS端点击不生效的问题
initReactFastClick()

ReactDom.render(
    <Provider store={Store}>
        <div>
            <Router />
        </div>
    </Provider>,
    document.getElementById('app')
)
