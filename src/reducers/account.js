import { serviceList } from './data'
import { handleActions } from 'redux-actions'
const state = {
    serviceList:serviceList
}

export const account = handleActions({},state)