import { createAction } from 'redux-actions'
import axios from 'utils/axios'

// 登录
export const login = params => dispatch => {
    return new Promise(async (resolve,reject) => {
        try {
            // 解构赋值并重命名
            const {data:info} = await axios.post('login',params);
            console.log(info)
            dispatch(createAction("LOGIN")(info));
            resolve(info)
        } catch (error) {
            reject(error)
        }
    })
}

// 跳出登录界面
export const showLogin = createAction("SHOW_LOGIN");

// 登出
export const signOut = createAction("SIGN_OUT");

// 设置菜单
export const setFooterList = createAction("SET_FOOTER_LIST");

export const setFooterBarIndex = createAction('SET_FOOTERBAR_INDEX');