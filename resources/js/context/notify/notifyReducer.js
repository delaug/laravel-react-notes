import {
    HIDE_NOTIFY,
    NOTIFY,
    SET_MESSAGE_NOTIFY,
    SET_STATUS_NOTIFY,
    SHOW_NOTIFY
} from "../types";

const handlers = {
    [NOTIFY]: (state, {payload}) => ({...state, visible: true, status: payload.status, message: payload.message}),
    [SHOW_NOTIFY]: state => ({...state, visible: true}),
    [HIDE_NOTIFY]: state => ({...state, visible: false}),
    [SET_MESSAGE_NOTIFY]: (state, {payload}) => ({...state, message: payload}),
    [SET_STATUS_NOTIFY]: (state, {payload}) => ({...state, status: payload}),
    DEFAULT: state => state
}

export const notifyReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
