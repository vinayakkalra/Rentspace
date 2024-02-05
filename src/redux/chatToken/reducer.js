import {SET_CHAT_TOKEN} from './actions'

const initialState={
    token:'',
}

export function chatTokenReducer(state=initialState,action){
    switch(action.type){
        case SET_CHAT_TOKEN:
            return {...state , token:action.payload}
        default:
            return state
    }

}
