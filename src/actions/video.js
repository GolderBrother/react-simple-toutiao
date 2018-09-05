import { createAction } from 'redux-actions'
import axios from 'utils/axios'

//上拉加载 videoList
export const getVideoList = (params) => dispatch => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data: {
                    list
                }
            } = await axios.get('video/list', params);
            dispatch(createAction('GET_VIDEO_LIST')(list));
            resolve(list)
        } catch (error) {
            reject(error)
        }

    })
}

// 下拉刷新当前videoList 的内容
export const refreshVideoList = (params) => dispatch => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data: {
                    list
                }
            } = await axios.get('video/list', params);
            dispatch(createAction('REFRESH_VIDEO_LIST')(list));
            resolve(list)
        } catch (error) {
            reject(error)
        }
    })
}

// 重新渲染
export const renderVideoList = createAction('RENDER_VIDEO_LIST')