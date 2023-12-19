import {SET_HOTELS} from './actions'

const initialState={
    hotels:[]
}

export function hotelsReducer(state=initialState,action){
    switch(action.type){
        case SET_HOTELS:
            return {...state,hotels:action.payload}
        default:
            return state
    }
}