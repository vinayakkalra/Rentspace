import {SET_LISTING} from './actions'

const initialState={
    listing:{},
}

export function listingReducer(state=initialState,action){
    switch(action.type){
        case SET_LISTING:
            return {...state , listing:action.payload}
        default:
            return state
    }

}
