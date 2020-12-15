import React, {useContext, useEffect} from 'react'
import {NoteList} from "./NoteList";
import {NoteContext} from "../../context/note/noteContext";
import {NoteForm} from "./NoteForm";
import {AuthContext} from "../../context/auth/authContext";

export const Note = () => {
    const {notes, edit, loading, fetchNotes, onEditNote, offEditNote, createNote, updateNote, deleteNote} = useContext(NoteContext)
    const {user} = useContext(AuthContext)

    useEffect(() => {
        user && fetchNotes()
    }, [])

    return (
        <div>
            <h1 className="pb-4">Notes</h1>
            {
                (user) ? (
                    <div>
                        <NoteForm
                            note={null}
                            offEditNote={offEditNote}
                            createNote={createNote}
                            updateNote={() => {
                            }}
                        />
                        <br/>
                        <NoteList
                            notes={notes}
                            edit={edit}
                            loading={loading}
                            onEditNote={onEditNote}
                            offEditNote={offEditNote}
                            createNote={() => {
                            }}
                            updateNote={updateNote}
                            deleteNote={deleteNote}
                        />
                    </div>
                ) : (
                    <blockquote className="blockquote">
                        Login for get access to notes!
                    </blockquote>
                )
            }
        </div>
    )
}
