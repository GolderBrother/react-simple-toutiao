import {
    Cookie
} from './storage'

// 操作 Token 信息
const TokenKey = "Token-Auth";

/**
 * 获取Token
 * @return string
 */
export function getToken() {
    return Cookie.get(TokenKey)
}

/**
 * 设置Token
 * @param string token
 * @return void
 */
export function setToken(token) {
    return Cookie.set(TokenKey, token)
}


/**
 * 删除Token
 * @return void
 */
export function removeToken() {
    return Cookie.remove(TokenKey)
}