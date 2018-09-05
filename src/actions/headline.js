import {
    createAction
} from 'redux-actions'
import axios from 'utils/axios'

// 添加 HeadLineList
export const addHeadLineList = params => dispatch => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data: info
            } = await axios.post('headline/add', params);
            info.time = 1;
            dispatch(createAction('ADD_HEADLINE_LIST')(info));
            resolve(info);
        } catch (error) {
            reject(error)
        }
    })
}

// 获取 HeadLineList
export const getHeadLineList = params => dispatch => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('getHeadLineList')
            const {
                data: {
                    list
                }
            } = await axios.get('headline/list', params);
            dispatch(createAction('GET_HEADLINE_LIST')(list));
            resolve(list)
        } catch (error) {
            reject(error)
        }
    })
}

// 刷新 RefreshHeadLineList
export const refreshHeadLineList = params => dispatch => {
    return new Promise(async (resolve,reject) => {
        try {
            const {data:{list}} = await axios.get('headline/list',params);
            dispatch(createAction('REFRESH_HEADLINE_LIST')(list));
            resolve(list)
        } catch (error) {
            reject(error)
        }
    })
}

// 渲染 renderHeadLineList
export const renderHeadLineList = createAction('RENDER_HEADLIST_LIST')