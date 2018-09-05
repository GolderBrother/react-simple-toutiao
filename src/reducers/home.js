import { handleActions } from 'redux-actions';
import { Local } from 'utils/storage';
import { news } from './data';

const state = {
    newsList:JSON.parse(Local.get('react_newList')) || news.slice(0,12),
    newsIndex:0
}

// 使用redux-actions handleActions(reducer)操作state
// State 的计算过程就叫做 Reducer,Reducer 函数负责生成 State
// Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
export const home = handleActions({
    // 添加news
    ADD_NEWS(state,action){
        const news = action.payload; //表示axtion携带的数据
        // 判断不存在news再添加
        if(state.newsList.every( item => item.title !== news.title )) {
            state.newsList.push(news);
            // Array.map((value,index,array) => ({...}))
            let newsList = state.newsList.map(({list,...other}) => ({...other}));
            Local.set('react_newList',JSON.stringify(newsList));
        } 
        return {...state}
    },
    // 删除news
    DEL_NEWS(state,action){
      const { payload:news } = action;
      const index = state.newsList.findIndex(n => n.title === news.title);
      state.newsList.splice(index,1);
      let newsList = state.newsList.map(({list,...other}) => ({...other}));
      Local.set('react_newList',JSON.stringify(newsList));
      return {...state};
    },
    // 获取 news
    GET_LIST_OF_NEWS(state,action){
        const { list,newsIndex } = action.payload;
        let news = state.newsList[newsIndex].list;
        state.newsList[newsIndex].hasMore = list.length < 5 ? false : true;
        state.newsList[newsIndex].list = news ? [...news,...list] : list;
        return {...state};
    },
    // 刷新当前news对应的内容
    REFRESH_LIST_OF_NEWS(state,action){
        const { list,newsIndex } = action.payload;
        state.newsList[newsIndex].list = list;
        state.newsList[newsIndex].hasMore = true;
        return {...state}
    },
    //设置当前news对应的下标
    SET_NEWS_INDEX(state,action){
        state.newsIndex = action.payload;
        return {...state};
    }
},state) 