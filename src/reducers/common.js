import { handleActions } from 'redux-actions'

const configState = {
    alert:{
       show:false,
       content:'' ,
       success:()=>{}
    },
    loading:{
        show:false
    }
}

export const config = handleActions({
    // 显示alert
    SHOW_ALERT:(state,action) => {
        console.log(action.payload);
        state.alert.show = true;
        state.alert = Object.assign({},state.alert,action.payload);
        return {...state}
    },
    // 隐藏alert
    HIDE_ALERT:state => {
        state.alert = {
            show:false,
            content:''
        };
        return {...state}
    },
    // 开启加载框
    SHOW_LOADING:state => {
        state.loading.show = true;
        return {...state}
    },
    // 关闭加载框
    HIDE_LOADING:state => {
        state.loading.show = false;
        return {...state}
    }
    
},configState)