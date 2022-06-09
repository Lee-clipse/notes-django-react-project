import React from 'react'

// get note and destructure
// then return .body
// used at NoteListPage.js
const ListItem = ({ note }) => {
    return (
        <div>
            <h3>{note.body}</h3>
        </div>
    )
}

export default ListItem