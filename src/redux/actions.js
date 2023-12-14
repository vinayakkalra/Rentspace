export const SET_USER="SET_USER"
export const SET_HOTELS="SET_HOTELS"

export const setUser=user=>dispatch=>{
    dispatch({
        type:SET_USER,
        payload:user,
    })
}
export const setHotels=hotels=>dispatch=>{
    dispatch({
        type:SET_HOTELS,
        payload:hotels
    })
}