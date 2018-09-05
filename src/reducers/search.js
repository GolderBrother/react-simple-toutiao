import { handleActions } from 'redux-actions'

const state = {
    searchList:[],
    hasMore:false,
    keywordList:['vue', 'react', 'webpack', 'angular']
}
export const search = handleActions({
    // 上拉加载
    GET_SEARCH_LIST:(state,action) => {
        const list = action.payload;
        if(list.length < 5){
            state.hasMore = false;
        }
        state.searchList = [...state.searchList,list]
        return {...state}
    },
    // 下拉刷新 
    REFRESH_SEARCH_LIST:(state,action) => {
        const list = action.payload;
        state.hasMore = true;
        state.searchList = list;
        return {...state}
    },
    // 渲染数据
    RENDER_SEARCH_LIST:state => ({...state})
},state)