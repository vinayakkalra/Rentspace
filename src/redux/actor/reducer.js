import { SET_ACTOR, UPDATE_USER} from './actions'
import { backend } from '../../declarations/backend'
import { User } from '../../declarations/User'
import { hotel } from '../../declarations/hotel'
import { setUser } from '../users/actions'
import { useDispatch } from 'react-redux'
import store from '../store'
import { booking } from '../../declarations/booking'

// const dispatch=useDispatch()
const initialState={
    actors:{
        backendActor:backend,
        userActor:User,
        hotelActor:hotel,
        bookingActor:booking,
        tokenActor:{},
        reviewActor:{}
    }
}
// async function who(actor){
//     let principal=await actor.whoami()
//     console.log("redux dispatch",principal)
// }


export function actorReducer(state=initialState,action){
    switch(action.type){
        case SET_ACTOR:
            // console.log({...state,actors:action.payload})
            state = {...state,actors:action.payload};
            return {...state,actors:action.payload}
        case UPDATE_USER:
            updateUser(state.actors.userActor,action.payload)
            return state
        default:
            return state
    }
}

async function updateUser(actor,user){
    console.log("executing : actor -->",actor,"user-->",user)
    await actor.updateUserInfo(user).then(async(res)=>{
        // console.log("update result : ",res)
        await actor.getUserInfo().then((resp)=>{
            // console.log("updated user redux",resp[0])   
            // store.dispatch(setUser(resp))
        })
    })
}