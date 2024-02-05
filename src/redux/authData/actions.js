export const SET_AUTH_DATA="SET_AUTH_DATA"

export const setAuthData=authData=>dispatch=>{
    dispatch({
        type:SET_AUTH_DATA,
        payload:authData
    })
}