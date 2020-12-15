import React, {useReducer} from 'react'
import {NoteContext} from "./noteContext"
import {noteReducer} from "./noteReducer"
import {
    ADD_NOTE,
    FETCH_NOTES,
    OFF_EDIT_NOTE,
    OFF_LOADING_NOTES,
    ON_EDIT_NOTE,
    ON_LOADING_NOTES, RELEASE_NOTES,
    REMOVE_NOTE,
    UPDATE_NOTE
} from "../types"

export const NoteState = ({children}) => {
    const [state, dispatch] = useReducer(noteReducer, {
        notes: [],
        edit: [],
        loading: false,
    })

    const onLoadingNotes = () => dispatch({type: ON_LOADING_NOTES})
    const offLoadingNotes = () => dispatch({type: OFF_LOADING_NOTES})
    const onEditNote = id => dispatch({type: ON_EDIT_NOTE, payload: id})
    const offEditNote = id => dispatch({type: OFF_EDIT_NOTE, payload: id})

    const fetchNotes = (cb_ok, cb_err) => {
        onLoadingNotes()
        window.axios.get('/sanctum/csrf-cookie').then(response => {
            window.axios.get('api/v1/notes')
                .then(response => {
                    if (response.data.notes) {
                        dispatch({type: FETCH_NOTES, payload: response.data.notes})
                    }
                    offLoadingNotes()

                    if (cb_ok && typeof cb_ok === "function")
                        cb_ok()
                })
                .catch(error => {
                    offLoadingNotes()

                    if (cb_err && typeof cb_err === "function")
                        cb_err(error.response.data.error)
                })
        });
    }
    const createNote = (note, cb_ok, cb_err) => {
        window.axios.get('/sanctum/csrf-cookie').then(response => {
            window.axios.post(`api/v1/notes`, note)
                .then(response => {
                    if (response.data.status == 'ok' && response.data.note) {
                        dispatch({type: ADD_NOTE, payload: response.data.note})
                    }
                    offEditNote(note.id)

                    if (cb_ok && typeof cb_ok === "function")
                        cb_ok()
                })
                .catch(error => {
                    offEditNote(note.id)

                    if (cb_err && typeof cb_err === "function")
                        cb_err(error.response.data.error || error.response.data.errors && <pre>{JSON.stringify(error.response.data.errors, undefined, 2)}</pre>)
                })
        });
    }
    const updateNote = (note, cb_ok, cb_err) => {
        window.axios.get('/sanctum/csrf-cookie').then(response => {
            window.axios.put(`api/v1/notes/${note.id}`, note)
                .then(response => {
                    if (response.data.status == 'ok' && response.data.note) {
                        dispatch({type: UPDATE_NOTE, payload: response.data.note})
                    }
                    offEditNote(note.id)

                    if (cb_ok && typeof cb_ok === "function")
                        cb_ok()
                })
                .catch(error => {
                    offEditNote(note.id)

                    if (cb_err && typeof cb_err === "function")
                        cb_err(error.response.data.error)
                })
        });
    }
    const deleteNote = (id, cb_ok, cb_err) => {
        window.axios.get('/sanctum/csrf-cookie').then(response => {
            window.axios.delete(`api/v1/notes/${id}`)
                .then(response => {
                    dispatch({type: REMOVE_NOTE, payload: id})

                    if (cb_ok && typeof cb_ok === "function")
                        cb_ok()
                })
                .catch(error => {

                    if (cb_err && typeof cb_err === "function")
                        cb_err(error.response.data.error)
                })
        });
    }
    const releaseNotes = () => {
        dispatch({type: RELEASE_NOTES})
    }

    return (
        <NoteContext.Provider value={{
            notes: state.notes,
            edit: state.edit,
            loading: state.loading,
            onLoadingNotes,
            offLoadingNotes,
            onEditNote,
            offEditNote,
            fetchNotes,
            createNote,
            updateNote,
            deleteNote,
            releaseNotes
        }}>
            {children}
        </NoteContext.Provider>
    )
}
