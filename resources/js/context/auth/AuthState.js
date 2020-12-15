import React, {useReducer} from 'react'
import {authReducer} from "./authReducer";
import {AuthContext} from "./authContext";
import {SET_TOKEN, SET_USER} from "../types";

export const AuthState = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    })

    const login = data => {
        return new Promise((resolve, reject) => {
            window.axios.get('/sanctum/csrf-cookie').then(response => {
                window.axios.post('api/v1/login', data)
                    .then(response => {
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('user', JSON.stringify(response.data.user))
                        window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
                        dispatch({type: SET_TOKEN, payload: response.data.token})
                        dispatch({type: SET_USER, payload: response.data.user})

                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        })
    }

    const register = data => {
        return new Promise((resolve, reject) => {
            window.axios.get('/sanctum/csrf-cookie').then(response => {
                window.axios.post('api/v1/register', data)
                    .then(response => {
                        if (response.data.token) {
                            localStorage.setItem('token', response.data.token)
                            localStorage.setItem('user', JSON.stringify(response.data.user))
                            window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
                            dispatch({type: SET_TOKEN, payload: response.data.token})
                            dispatch({type: SET_USER, payload: response.data.user})
                        }

                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        })
    }

    const logout = () => {
        return new Promise((resolve, reject) => {
            window.axios.get('/sanctum/csrf-cookie').then(response => {
                window.axios.post('api/v1/logout', null)
                    .then(response => {
                        if (response.data.status == 'ok') {
                            localStorage.removeItem('token')
                            localStorage.removeItem('user')
                            dispatch({type: SET_TOKEN, payload: ''})
                            dispatch({type: SET_USER, payload: null})
                        }

                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        })
    }

    return (
        <AuthContext.Provider value={{
            token: state.token,
            user: state.user,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
