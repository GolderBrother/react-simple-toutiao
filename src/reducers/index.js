// 通过combineReducers方法将三个子 Reducer 合并成一个大的函数
import { combineReducers } from 'redux';
// 引入所有的子reducer，子组件与子 Reducer 完全可以对应
import * as account from './account'
import * as article from './article'
import * as common from './common';
import * as headline from './headline';
import * as home from './home';
import * as record from './record';
import * as search from './search';
import * as user from './user';
import * as video from './video';
export default combineReducers({
    ...account,
    ...article,
    ...common,
    ...headline,
    ...home,
    ...record,
    ...search,
    ...user,
    ...video
})