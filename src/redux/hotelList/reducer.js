import {SET_HOTEL_LIST} from './actions'

const initialState={
    hotelList:[]
}

export function hotelListReducer(state=initialState,action){
    switch(action.type){
        case SET_HOTEL_LIST:
            return {...state,hotelList:action.payload}
        default:
            return state
    }
}