import socket from "../socket"

const SET_FINANCES = "SET_FINANCES"
const UPDATE_TIME = "UPDATE_TIME"

let initialState = {
    finances: [],
    time: 5000,
    prevFinances: []
}

const financesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FINANCES: {
            return {
                ...state,
                prevFinances: state.finances,
                finances: action.payload,
            }
        }
        case UPDATE_TIME: {
            return {
                ...state,
                time: action.payload
            }
        }
        default:
            return state
    }
}

export const updateTime = (payload) => ({type: UPDATE_TIME, payload})

export const getFinances = () => {
    return async (dispatch) => {
        socket.on('ticker',  (res) => {
            dispatch({type: SET_FINANCES, payload: res})
        })
    }
}

export default financesReducer