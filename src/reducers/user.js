import { handleActions } from 'redux-actions'
import { Cookie } from 'utils/storage'

const state = {
    isLogin:false,
    user:{
        username:Cookie.get('username') || '',
        avatar:Cookie.get('avatar') || ''
    },
    footerBarIndex:0,
    footerBarList:[
        {title:'首页',icon:'home',path:'/'},
        {title:'西瓜视频',icon:'video',path:'/video'},
        {title:'微头条',icon:'comment',path:'/headline'},
        {title:`${Cookie.get('username') ? '我的' : '未登录'}`,icon:`${Cookie.get('username') ? 'account' : 'account1'}`,path:'/account'}
    ]
}

export const user = handleActions({
    // 登录，存入登录信息
    LOGIN:(state,action) => {
        const user = {
            username:action.payload.username,
            avatar:require('assets/images/avatar.png')
        }
        state.user = user;
        Cookie.set(user);
        return {...state}
    },
    // 登出，清除用户信息
    SIGN_OUT:(state,action) => {
        state.user = {
            username:'',
            avatar:''
        };
        Cookie.remove(['username','avatar']);
        return {...state}
    },
    // 已登录
    SHOW_LOGIN:(state,action) => {
        state.isLogin = true;
        return {...state}
    },
    // 最后一个tab栏设置
    SET_FOOTER_LIST:(state,action) => {
        state.footerBarList[3] = action.payload;
        return {...state}
    },
    // 设置footerBar的下标
    SET_FOOTERBAR_INDEX(state,action){
        state.footerBarIndex = action.payload;
        return {...state}
    }
},state)

