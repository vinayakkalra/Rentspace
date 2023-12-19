import {SET_PRINCIPLE} from './actions'


const initialState={
    principle:'',
}

export function principleReducer(state=initialState,action){
    switch(action.type){
        case SET_PRINCIPLE:
            return {...state,principle:action.payload}
        default:
            return state
    }
}
