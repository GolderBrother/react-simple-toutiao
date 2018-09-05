import { createAction } from "redux-actions"
import axios from 'utils/axios'

// 上拉加载 SearchList  
export const getSearchList = params => dispatch => {
    return new Promise(async (resolve,reject) => {
        try {
            const {data:{list}} = await axios.get("search",params);
            console.log(list)
            dispatch(createAction("GET_SEARCH_LIST")(list));
            resolve(list);
        } catch (error) {
            reject(error)
        }
    })
}

// 下拉刷新 SearchList
export const refreshSearchList = params => dispatch => {
    return new Promise(async (resolve,reject) => {
        try {
            const { data:{list} } = await axios.get("search",params);
            dispatch(createAction("REFRESH_SEARCH_LIST")(list))
            resolve(list)
        } catch (error) {
            reject(error)
        }
    })
}

// 重新渲染 SearchList
export const renderSearchList = createAction("RENDER_SEARCH_LIST")