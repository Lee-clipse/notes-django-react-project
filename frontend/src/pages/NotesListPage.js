import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'


const NotesListPage = () => {

	// notes = [], when setNotes() called, can access to 'notes'
	let [notes, setNotes] = useState([])

	// If we render page first, this called once
	useEffect(() => {
		getNotes()
	}, [])

	let getNotes = async () => {
		// fetch that data of url (Django)
		let response = await fetch('/api/notes/')
		
		// wait till json parser done
		let data = await response.json()
		console.log('DATA: ', data)

		// notes = data
		setNotes(data)
	}

    return (
        <div>
            <div className='notes-list'>
				{notes.map((note, index) =>(
					<ListItem key={index} note={note} />
				))}
			</div>
        </div>
    )
}

export default NotesListPage