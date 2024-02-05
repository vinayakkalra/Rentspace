export const SET_BOOKINGS="SET_BOOKINGS"

export const setBookings=bookings=>dispatch=>{
    dispatch({
        type:SET_BOOKINGS,
        payload:bookings
    })
}