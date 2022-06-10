import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {

    let noteId = useParams()
    let [note, setNote] = useState(null)

    // when 'noteId' changes, this called
    useEffect(() => {
        getNote()
    }, [noteId])


    // in v6 update, history.push() -> useNavigate()
    const navigate = useNavigate()


    let getNote = async () => {
        if (noteId.id === 'new') return 

        // it's different from 'Link to' syntax of ListItem.js
        let response = await fetch('/api/notes/' + noteId.id + '/', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        })
        let data = await response.json()
        setNote(data)
    }


    let createNote = async () => {
        fetch('/api/notes/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        }) 
    }
    

    // put updated 'note' to fetched url (django admin page)
    let updateNote = async () => {
        fetch('/api/notes/' + noteId.id + '/', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        }) 
    }


    // delete single note and return 
    let deleteNote = async () => {
        fetch('/api/notes/' + noteId.id + '/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate('/')
    }


    let handleSubmit = () => {
        // note is exist and contents have nothing
        if (noteId.id !== 'new' && note.body === '') {
            deleteNote()
        } 
        // note is exist and contents have something
        else if (noteId.id !== 'new') {
            updateNote()
        }
        // user clicked AddButton and contents have something
        else if (noteId.id === 'new') {
            if (note) {
                if (note.body !== '') {
                    createNote()
                }
            }
        } 
        navigate('/')
    }


    // If user update title or contents of note, they called setNote() and update it
    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {noteId.id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea 
                onChange={(e) => { setNote({ ...note, 'body':e.target.value }) }} 
                value={note?.body}>
            </textarea>
        </div>
    )
}

export default NotePage