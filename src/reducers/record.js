import { handleActions } from 'redux-actions'
const state = {
    types:[
        {title:'我的收藏',list:[]},
        {title:'阅读历史',list:[]},
        {title:'推送历史',list:[]}
    ],
    // types:{
    //     'sc': {title:'我的收藏',list:[]},
    //     'sc': {title:'我的收藏',list:[]},
    //     'sc': {title:'我的收藏',list:[]},
    // },
    index:0,
    recordList:[]
}

export const record = handleActions({
    GET_RECORD_LIST:(state,action) => {
        const list = action.payload;
        const { index } = state;
        state.types[index].list = [...state.types[index].list,...list]
        return {...state}
    },
    REFRESH_RECORD_LIST:(state,action) => {
        const list = action.payload;
        const { index } = state;
        state.types[index].list = list;
        return {...state}
    },
    RENDER_RECORD_LIST:state => ({...state}),
    SET_RECORD_INDEX:(state,action) => {
        state.index = action.payload;
        return { ...state }
    }
},state)