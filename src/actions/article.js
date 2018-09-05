import {
    createAction
} from 'redux-actions'
import axios from 'utils/axios'

// 获取文章数据
export const getArticleInfo = params => dispatch => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get("article/info", params);
            // 发出异步 Action
            await dispatch(createAction("GET_ARTICLE_INFO")(data));
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

// 重新渲染文章数据
export const renderArticleInfo = createAction("RENDER_ARTICLE_INFO");