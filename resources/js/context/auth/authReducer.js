import {
    SET_TOKEN,
    SET_USER
} from "../types";

const handlers = {
    [SET_TOKEN]: (state, {payload}) => ({...state, token: payload}),
    [SET_USER]: (state, {payload}) => ({...state, user: payload}),
    DEFAULT: state => state
}

export const authReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
