import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

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

    // ? means if note is null, do not anything
    return (
        <div>
            <p>{note?.body}</p>
        </div>
    )
}

export default NotePage