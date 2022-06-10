import React, { useState, useEffect } from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'


const NotesListPage = () => {

	let [notes, setNotes] = useState([])

	// this called once when the page is first rendered 
	useEffect(() => {
		getNotes()
	}, [])

	// get note list
	let getNotes = async () => {
		let response = await fetch('/api/notes/')
		let data = await response.json()
		setNotes(data)
	}

	// view of note list page
	// AddButton -> /notes/new/
    return (
        <div className="notes">
			<div className="notes-header">
				<h2 className="notes-title">&#9782; Notes</h2>
				<p className="notes-count">{notes.length}</p>
			</div>

            <div className='notes-list'>
				{notes.map((note, index) =>(
					<ListItem key={index} note={note} />
				))}
			</div>
			<AddButton/>
        </div>
    )
}

export default NotesListPage
