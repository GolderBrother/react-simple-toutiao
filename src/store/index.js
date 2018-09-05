// 异步操作的第一种解决方案就是，写出一个返回函数的 Action Creator，然后使用redux-thunk中间件改造store.dispatch,使得后者(store.dispatch)可以接受函数作为参数。
import { createStore,compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
// 用createDevTools()创建的DevTools组件有个特殊的静态方法instrument(),它返回一个store的增强器,在开发中你需要在compose中使用。
// 注意：DevTools.instrument()要放在applyMiddleware后，因为你的applyMiddleware可以存在异步行为，为了确保所有的actions显示在store中，所以要放在后面
import DevTools from '../utils/devTools';
import reducer from '../reducers';
// 将reducer都放到store对象，用来监听action,Store 自动调用 Reducer，改变state
// 引入createStore创建store对象，引入applyMiddleware 来使用中间件
const configStore = preloadedState => createStore(
    reducer,
    preloadedState,
    // compose 从右到左来组合多个函数。
    compose(
        applyMiddleware(thunk),
        DevTools.instrument()  
    )
)
export default configStore()

