import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {

    // in v6 update, history.push() -> useNavigate()
    const navigate = useNavigate()

    // get 'id' of '3000/note/id' url
    let noteId = useParams()

    let [note, setNote] = useState(null)

    // If 'noteId' changes, this called
    useEffect(() => {
        getNote()
    }, [noteId])


    let getNote = async () => {
        // it's different from 'Link to' syntax of ListItem.js
        let response = await fetch('/api/notes/' + noteId.id)
        let data = await response.json()
        setNote(data)
    }


    // put updated 'note' to fetched url (django admin page)
    let updateNote = async () => {
        fetch('/api/notes/' + noteId.id + '/update/', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        }) 
        navigate('/')
    }


    // delete single note and return 
    let deleteNote = async () => {
        fetch('/api/notes/' + noteId.id + '/delete/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate('/')
    }


    // '?' means if note is null, do not anything
    // '/' means go to back
    // If user update title or contents of note, they called setNote() and udpate it
    // Click ArrowLeft icon -> update() -> go back
    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={updateNote} />
                </h3>
                <button onClick={deleteNote}>Delete</button>
            </div>
            <textarea 
                onChange={(e) => { setNote({ ...note, 'body':e.target.value }) }} 
                defaultValue={note?.body}>
            </textarea>
        </div>
    )
}

export default NotePage