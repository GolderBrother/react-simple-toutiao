import axios from 'axios';
import qs from 'qs';
import store from '../store';
import { showAlert } from '../actions/common'
// 设置axios可以携带cookie,这边服务端也需要设置 credentials 为true 才行 
axios.defaults.withCredentials = true; 
// 设置请求的默认前缀地址
axios.defaults.baseURL = 'https://easy-mock.com/mock/5a6fe597a52f145df7e8a38a/apis/';
// axios请求前拦截
axios.interceptors.request.use(config => config,err => Promise.reject(err))
// axios响应前拦截
axios.interceptors.response.use(response => response,err => Promise.reject(err))

// 请求响应中间件
// 检查状态码
const checkStatus = (res) => {
    const { status } = res;
    if(status == 200 || status == 304){
        return res.data;
    }
    return {
        code:0,
        msg:res.data.msg || res.statusText,
        data:res.statusText
    }
}
// 检查CODE
const checkCode = (res) => {
    const { msg,code } = res;
    if(code == 0){
        console.log(showAlert)
        store.dispatch(showAlert({content:msg}))
        throw new Error(msg)
    }
    return res;
}

export default {
    get(url,params){
        if(!url) return;
        return axios({
            method:'get',
            params:params,
            url:url,
            timeout:30000
        }).then(res => checkStatus(res)).then(res => checkCode(res))
    },
    post(url,data){
        if(!url) return;
        return axios({
            method:'post',
            data:qs.stringify(data),
            url:url,
            timeout:30000
        }).then(res => checkStatus(res)).then(res => checkCode(res))
    },
    
}