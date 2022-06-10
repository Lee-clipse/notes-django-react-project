import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {

    let noteId = useParams()
    let [note, setNote] = useState(null)

    // this called when 'noteId' changes
    useEffect(() => {
        getNote()
    }, [noteId])

    
    // get single note
    let getNote = async () => {
        // user clicked AddButton just before
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
    

    let updateNote = async () => {
        fetch('/api/notes/' + noteId.id + '/', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        })
    }


    let deleteNote = async () => {
        fetch('/api/notes/' + noteId.id + '/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        window.location.replace("/")
    }


    let handleSubmit = () => {
        // user clears all text and clicks '<'
        if (noteId.id !== 'new' && note.body === '') {
            deleteNote()
        } 
        // user want to save something
        else if (noteId.id !== 'new') {
            updateNote()
        }
        // user clicked AddButton just before
        else if (noteId.id === 'new') {
            // contents have something
            if (note) {
                if (note.body !== '') {
                    createNote()
                }
            }
        }
        window.location.replace("/")
    }


    // If user update contents of note, setNote() called and update it
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