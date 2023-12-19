export const SET_PRINCIPLE="SET_PRINCIPLE"

export const setPrinciple=principle=>dispatch=>{
    dispatch({
        type:SET_PRINCIPLE,
        payload:principle
    })
}