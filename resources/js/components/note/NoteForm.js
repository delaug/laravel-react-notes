import React, {useState, useContext} from 'react'
import {NotifyContext} from "../../context/notify/notifyContext";

export const NoteForm = ({note, offEditNote, createNote, updateNote}) => {
    const [id, setId] = useState(note ? note.id : '')
    const [title, setTitle] = useState(note ? note.title : '')
    const [text, setText] = useState(note ? note.text : '')
    const [loading, setLoading] = useState(false)

    const {notify} = useContext(NotifyContext)

    return (
        <div className="note-card card my-1">
            <div className="card-body">
                <input
                    type="text"
                    id="noteFormId"
                    name="id"
                    value={id}
                    onChange={e=>setId(e.target.value)}
                    hidden
                />
                <div className="mb-3">
                    <label htmlFor="noteFormTitle" className="form-label">Title note</label>
                    <input
                        type="text"
                        className="form-control"
                        id="noteFormTitle"
                        name="title"
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="noteFormText" className="form-label">Text note</label>
                    <textarea
                        className="form-control"
                        id="noteFormText"
                        name="text"
                        value={text}
                        rows="3"
                        onChange={e=>setText(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    {
                        (loading) ? (
                            <button className="btn btn-sm btn-primary" type="button" disabled>
                                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                &nbsp;Loading...
                            </button>
                        ) : (
                            (note) ? (
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                            setLoading(true)
                                            updateNote(
                                                {id,title,text},
                                                () => {
                                                    notify({status: 'success', message: 'Note updated'})
                                                    setLoading(false)
                                                },
                                                (e) => {
                                                    notify({status: 'danger', message: e})
                                                    setLoading(false)
                                                }
                                            )
                                        }}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="btn secondary btn-sm"
                                        onClick={() => offEditNote(id)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                        if(title == '' || text == '') {
                                            notify({
                                                status: 'warning',
                                                message: 'All fields are required',
                                            })
                                            return
                                        }

                                        setLoading(true)
                                        createNote(
                                            {title, text},
                                            () => {
                                                setLoading(false)
                                                setTitle('')
                                                setText('')
                                                notify({status: 'success', message: 'Note created'})
                                            },
                                            (e) => {
                                                notify({status: 'danger', message: e})
                                                setLoading(false)
                                            }
                                        )
                                    }}
                                >
                                    Create
                                </button>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}
