import { SET_USER,SET_HOTELS } from "./actions";

const initialState={
    user:{},
    hotels:[],
}

export function userReducer(state=initialState,action){
    switch(action.type){
        case SET_USER:
            return {...state , user:action.payload}
        default:
            return state
    }

}

export function hotelsReducer(state=initialState,action){
    switch(action.type){
        case SET_HOTELS:
            return {...state,hotels:action.payload}
        default:
            return state
    }
}