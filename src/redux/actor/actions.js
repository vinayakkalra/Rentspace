export const SET_ACTOR="SET_ACTOR"
export const UPDATE_USER="UPDATE_USER"

export const setActor=actors=>{
    return {
        type:SET_ACTOR,
        payload:actors
    }
}
export const updatingUser=(user)=>{
    return{
        type:UPDATE_USER,
        payload:user
    }
}

