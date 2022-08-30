import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:4000/"
})

export const deleteTicker = (ticker) => {
    return instance.delete(`/${ticker}`)
}
export const addTicker = (ticker) => {
    return instance.post(`/${ticker}`)
}
export const disableTicker = (ticker) => {
    return instance.put(`/disable/${ticker}`)
}
export const activateTicker = (ticker) => {
    return instance.put(`/activate/${ticker}`)
}