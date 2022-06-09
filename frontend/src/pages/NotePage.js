import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {

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

    // '?' means if note is null, do not anything
    // '/' means go to back
    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/">
                        <ArrowLeft/>
                    </Link>
                </h3>
            </div>
            <textarea defaultValue={note?.body}></textarea>
        </div>
    )
}

export default NotePage