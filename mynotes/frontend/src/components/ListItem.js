import React from 'react'
import { Link } from 'react-router-dom'


// get update timestamp and change to easy looking
let getTime = (note) => {
    return new Date(note.update).toLocaleDateString()
}


// take title from contents
let getTitle = (note) => {
    let title = note.body.split('\n')[0]
    
    if (title.length > 45) {
        return title.slice(0, 45)
    }
    return title
}


// view part of contents at NoteListPage
// if content is too long, then slice to ' ...'
let getContent = (note) => {
    let title = getTitle(note)
    let content = note.body.replaceAll('\n', ' ')
    content = content.replaceAll(title, '')

    if (content.length > 40) {
        return content.slice(0, 40) + ' ...'
    } else {
        return content
    }
}


// This tag called at NoteListPage.js
const ListItem = ({ note }) => {
    // it's different from 'fetch' syntax of NotePage.js 
    return (
        <Link to={`/note/${note.id}`}>
            <div className="notes-list-item">
                <h3>{getTitle(note)}</h3>
                <p><span>{getTime(note)}</span>{getContent(note)}</p>
            </div>
        </Link>
    )
}

export default ListItem