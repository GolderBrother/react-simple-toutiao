import { handleActions } from 'redux-actions'

const state = {
    articleInfo:{}
}

export const article = handleActions({
    // 获取文章信息
    GET_ARTICLE_INFO:(state,action) => {
        state.articleInfo = action.payload;
        return {...state}
    },
    RENDER_ARTICLE_INFO:state => ({...state})
},state)

