import { handleActions } from 'redux-actions'

const state = {
    headlinelist:[],
    hasMore:true
}

export const headline = handleActions({
    ADD_HEADLINE_LIST:(state,action) => {
        state.headlinelist.unshift(action.payload);
        return {...state};
    },
    GET_HEADLINE_LIST:(state,action) => {
        const list = action.payload;
        if(list.length < 5){
            state.hasMore = false
        }
        state.headlinelist = [...state.headlinelist,...list];
        return {...state}
    },
    REFRESH_HEADLINE_LIST:(state,action) => {
        state.headlinelist = action.payload;
        state.hasMore = true;
        return {...state}
    },
    RENDER_HEADLIST_LIST:state => ({...state})
},state)

