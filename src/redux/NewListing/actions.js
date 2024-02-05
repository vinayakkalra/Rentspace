import store from "../store"

export const SET_LISTING="SET_LISTING"


export const setListing=listing=>dispatch=>{
    dispatch({
        type:SET_LISTING,
        payload:listing,
    })
}