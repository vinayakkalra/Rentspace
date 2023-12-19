export const SET_ACTOR="SET_ACTOR"

export const setActor=actors=>dispatch=>{
    dispatch({
        type:SET_ACTOR,
        payload:actors
    })
}