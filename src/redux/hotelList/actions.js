export const SET_HOTEL_LIST="SET_HOTEL_LIST"

export const setHotelList=hotelList=>dispatch=>{
    dispatch({
        type:SET_HOTEL_LIST,
        payload:hotelList
    })
}

