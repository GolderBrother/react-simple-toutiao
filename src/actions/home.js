import { createAction } from 'redux-actions';
import axios from 'src/utils/axios';
// 添加 news
export const addNews = createAction('ADD_NEWS');

// 删除 news
export const delNews = createAction('DEL_NEWS');

// 设置当前news 的下标
export const setNewsIndex = createAction('SET_NEWS_INDEX');


// 获取当前newsTab对应的数据
export const getListOfNews = ({list,params},{newsIndex,newsList,hasMore=false}) => dispatch => {
    if(!hasMore){
        const obj = newsList.find(n => n.id === newsList[newsIndex].id);
        // 如果有内容，就不再请求
        if(obj.list) return
    }
    return new Promise(async (resolve,reject) => {
        try {
            const { data:{list} } = await axios.get('home/list',params);
            // createAction('GET_LIST_OF_NEWS') 返回一个reducer函数
            dispatch(createAction('GET_LIST_OF_NEWS')({list,newsIndex}));
            resolve(list)
        } catch (error) {
            reject(error)
        }
    })
}

// 刷新取当前news对应的数据
export const refreshListOfNews = ({list,params},newsIndex) => dispatch => {
    return new Promise(async (resolve,reject) => {
        try {
            const { list } = await axios.get('home/list',params);
            dispatch(createAction('REFRESH_LIST_OF_NEWS')({list,newsIndex}));
            resolve(list);
        } catch (error) {
            reject(error)
        }
    })
    
}
