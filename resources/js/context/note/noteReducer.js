import {
    ADD_NOTE,
    FETCH_NOTES,
    OFF_EDIT_NOTE,
    OFF_LOADING_NOTES,
    ON_EDIT_NOTE,
    ON_LOADING_NOTES,
    RELEASE_NOTES,
    REMOVE_NOTE,
    UPDATE_NOTE
} from "../types";

const handlers = {
    [FETCH_NOTES]: (state, {payload}) => ({...state, notes: payload}),
    [ADD_NOTE]: (state, {payload}) => ({...state, notes: [payload,...state.notes]}),
    [UPDATE_NOTE]: (state, {payload}) => ({
        ...state,
        notes: state.notes.map(note => note.id === payload.id ? payload : note)
    }),
    [REMOVE_NOTE]: (state, {payload}) => ({
        ...state,
        notes: state.notes.filter(note => note.id !== payload)
    }),
    [ON_EDIT_NOTE]: (state, {payload}) => ({...state, edit: [...state.edit, payload]}),
    [OFF_EDIT_NOTE]: (state, {payload}) => ({
        ...state,
        edit: state.edit.filter(el => el !== payload)
    }),
    [ON_LOADING_NOTES]: state => ({...state, loading: true}),
    [OFF_LOADING_NOTES]: state => ({...state, loading: false}),
    [RELEASE_NOTES]: state => ({...state, notes: [], edit: [], loading: false}),
    DEFAULT: state => state
}

export const noteReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
