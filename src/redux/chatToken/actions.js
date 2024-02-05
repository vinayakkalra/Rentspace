export const SET_CHAT_TOKEN="SET_CHAT_TOKEN"

export const setChatToken=token=>{
    return {
        type:SET_CHAT_TOKEN,
        payload:token
    }
}


