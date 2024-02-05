import {SET_AUTH_DATA} from './actions'


const initialState={
    authData:{
        principal:"",
        publicKey:"",
        signature:""
    },
}

export function authDataReducer(state=initialState,action){
    switch(action.type){
        case SET_AUTH_DATA:
            return {...state,authData:action.payload}
        default:
            return state
    }
}
