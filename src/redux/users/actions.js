import store from "../store"

export const SET_USER="SET_USER"
export const UPDATE_USER="UPDATE_USER"

export const setUser=user=>dispatch=>{
    dispatch({
        type:SET_USER,
        payload:user,
    })
}
// export const updateUser=async(user)=>{
//     let actors=store.getState().actorReducer.actors
//     let newUser={}
//     await actors.userActor.updateUserInfo(user).then(async(res)=>{
//         console.log("prev user : ",res[0])
//         newUser=await actors.userActor.getUserInfo()
//     })
//     return({
//         type:UPDATE_USER,
//         payload:newUser[0]
//     })
// }