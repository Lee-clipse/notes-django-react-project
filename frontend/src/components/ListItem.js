import React from 'react'
import { Link } from 'react-router-dom'

// get note and destructure
// then return .body
// used at NoteListPage.js
const ListItem = ({ note }) => {
    // it's different from 'fetch' syntax of NotePage.js 
    return (
        <Link to={`/note/${note.id}`}>
            <div className="notes-list-item">
                <h3>{note.body}</h3>
            </div>
        </Link>
    )
}

export default ListItem