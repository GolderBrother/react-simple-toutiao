import { createAction } from 'redux-actions'
import axios from 'utils/axios'

// 获取 recordList
export const getRecordList = params => dispatch => {
    return new Promise(async (resolve,reject) => {
        try {
            const { data:{list} } = await axios.get("record/list",params);
            console.log(list)
            dispatch(createAction("GET_RECORD_LIST")(list));
            resolve(list);
        } catch (error) {
            reject(error)
        }
    })
}

// 刷新 recordList
export const refreshRecordList = params => dispatch => {
    return new Promise(async (resolve,reject) => {
        try {
            const {data:{list}} = await axios.get("record/list",params);
            dispatch(createAction("REFRESH_RECORD_LIST")(list));
            resolve(list)
        } catch (error) {
            reject(error)
        }
    })
}

// 渲染 recordList
export const renderRecord = createAction("RENDER_RECORD_LIST");

// 设置 recordList 索引
export const setRecordIndex = createAction("SET_RECORD_INDEX");
