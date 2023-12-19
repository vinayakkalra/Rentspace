export const SET_HOTELS="SET_HOTELS"

export const setHotels=hotels=>dispatch=>{
    dispatch({
        type:SET_HOTELS,
        payload:hotels
    })
}

