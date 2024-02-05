import {SET_BOOKINGS} from './actions'


const initialState={
    bookings:[],
}

export function bookingsReducer(state=initialState,action){
    switch(action.type){
        case SET_BOOKINGS:
            return {...state,bookings:action.payload}
        default:
            return state
    }
}
