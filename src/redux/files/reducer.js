import {SET_FILES} from './actions'

const initialState={
    files:[],
}

export function filesReducer(state=initialState,action){
    switch(action.type){
        case SET_FILES:
            return {...state , files:action.payload}
        default:
            return state
    }

}
