import React from 'react'
import {NoteItem} from "./NoteItem";
import {NoteForm} from "./NoteForm";

export const NoteList = ({notes,edit,loading,onEditNote,offEditNote,updateNote,deleteNote}) => {
    return (
        <div>
            {
                (!loading) ? (
                    (notes && notes.length > 0) ?
                    notes.map(note => {
                        if (edit && edit.find(f => f === note.id))
                            return <NoteForm
                                note={note}
                                key={note.id}
                                offEditNote={offEditNote}
                                updateNote={updateNote}
                            />
                        return <NoteItem
                            note={note}
                            key={note.id}
                            deleteNote={deleteNote}
                            onEditNote={onEditNote}
                        />
                    }
                    ) : 'Empty notes'
                ) : (
                    <div className="text-center">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
