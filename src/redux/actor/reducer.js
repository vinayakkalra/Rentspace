import {SET_ACTOR} from './actions'
import { backend } from '../../declarations/backend'
import { User } from '../../declarations/User'
import { hotel } from '../../declarations/hotel'

const initialState={
    actors:{
        backendActor:backend,
        userActor:User,
        hotelActor:hotel
    }
}

export function actorReducer(state=initialState,action){
    switch(action.type){
        case SET_ACTOR:
            return {...state,actors:action.payload}
        default:
            return state
    }
}
