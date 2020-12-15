import React, {useReducer} from 'react'
import {NotifyContext} from "./notifyContext";
import {notifyReducer} from "./notifyReducer";
import {HIDE_NOTIFY, NOTIFY, SET_MESSAGE_NOTIFY, SET_STATUS_NOTIFY, SHOW_NOTIFY} from "../types";

export const NotifyState = ({children}) => {
    const [state, dispatch] = useReducer(notifyReducer, {
        visible: false,
        message: '',
        status: 'info'
    })

    const notify = (data) => {
        dispatch({type: NOTIFY, payload: data})
        setTimeout(() => {
            hideNotify()
        }, 3000)
    }
    const showNotify = () => dispatch({type: SHOW_NOTIFY})
    const hideNotify = () => dispatch({type: HIDE_NOTIFY})
    const setNotifyMessage = message => dispatch({type: SET_MESSAGE_NOTIFY, payload: message})
    const setNotifyStatus = status => dispatch({type: SET_STATUS_NOTIFY, payload: status})

    return (
        <NotifyContext.Provider value={{
            visible: state.visible,
            message: state.message,
            status: state.status,
            notify,
            showNotify,
            hideNotify,
            setNotifyMessage,
            setNotifyStatus
        }}>
            {children}
        </NotifyContext.Provider>
    )
}
