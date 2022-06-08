import React, {useState, useEffect} from 'react'

const NotesListPage = () => {

	{/* notes = [], when setNotes() called, can access to 'notes' */}
	let [notes, setNotes] = useState([])

	useEffect(() => {

	}, [])

	let getNotes = async () => {
		fetch('http://127.0.0.1:8000/api/notes/')
	}

    return (
        <div>
            notes
        </div>
    )
}

export default NotesListPage
