import React from 'react'

// redux-devtools 是一个非常棒的工具，它可以让你实时的监控Redux的状态树的Store  
//从redux-devtools中引入createDevTools
import { createDevTools } from 'redux-devtools';

//显示包是单独的，要额外指定
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// 在你的App项目中，通过“Monitor（监视显示）”用createDevTools创建一个DevTools组件。
const Devtools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q'>
        <LogMonitor />
    </DockMonitor>
);

export default Devtools
