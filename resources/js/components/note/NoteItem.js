import React, {useContext} from 'react'
import {NotifyContext} from "../../context/notify/notifyContext";

export const NoteItem = ({note, onEditNote, deleteNote}) => {
    const {notify} = useContext(NotifyContext)

    return (
        <div className="note-card card my-1">
            <div className="card-body">
                <div className="note-card-button-bar">
                    <i
                        className="button-edit fa fa-pencil"
                        onClick={() => onEditNote(note.id)}
                    ></i>
                    <i
                        className="button-delete fa fa-times"
                        onClick={() => deleteNote(
                            note.id,
                            () => {
                                notify({status: 'success', message: 'Note delete'})
                            },
                            (e) => {
                                notify({status: 'danger', message: e})
                            }
                        )}
                    ></i>
                </div>
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.text}</p>
                <p className="card-text">
                    <small className="text-muted" title="Note created">
                        <i className="fa fa-plus"></i> {note.carbon.created_at}
                    </small>
                    <small className="text-muted" title="Last note update">
                        <i className="fa fa-edit"></i> {note.carbon.updated_at}
                    </small>
                </p>
            </div>
        </div>
    )
}
