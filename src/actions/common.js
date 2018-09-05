import { createAction } from 'redux-actions'

/**
 * Redux 的工作流程，做一个梳理
 * 1.首先，用户发出 Action store.dispatch(action);
 * 如果需要接收参数，就需要一个dispatch来发出action，来执行createAction后的函数并传入参数
 * 2.然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action('SHOW_ALERT')。 Reducer 会返回新的 State 。
 * let nextState = todoApp(previousState, action)
 * 3.State 一旦有变化，Store 就会调用监听函数。
 * // 设置监听函数
 * store.subscribe(listener);
 * 4.listener可以通过store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。
 * function listerner() {
 * let newState = store.getState();
 * component.setState(newState);   
 * }
 */

// 显示Alert 
export const showAlert = params => dispatch => dispatch(createAction('SHOW_ALERT')(params));
// export const showAlert = createAction('SHOW_ALERT');


// 隐藏Alert
export const hideAlert = createAction('HIDE_ALERT');

// 展示加载框
export const showLoading = createAction('SHOW_LOADING');

// 隐藏加载框
export const hideLoading = createAction('HIDE_LOADING');

