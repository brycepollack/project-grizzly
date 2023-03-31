import { useState, useEffect } from 'react'

import Editor from "./Editor";
import Notes from '../components/Notes'
import AddNote from './NoteEditor'
import Button from './Button'

const Home = () => {

	const [notes, setNotes] = useState([])

	const [adding, setAdding] = useState(false)

	useEffect(() => {

		getNotes();
		  
	}, [])

	const getNotes = async () => {
		const notesFromServer = await fetchAllNotes()
		setNotes(notesFromServer)
	}

	const fetchAllNotes = async () => {
		const res = await fetch('http://localhost:8080/notes')
		const data = await res.json()
	
		return data
	}

	const fetchSpecificNote = async (id) => {
		const res = await fetch(`http://localhost:8080/notes/${id}`)
		const data = await res.json()
	
		return data
	}

	const addNote = async (note) => {
		const res = await fetch('http://localhost:8080/notes', {
		  method: 'POST',
		  headers: {
			'Content-type': 'application/json',
		  },
		  body: JSON.stringify(note),
		})
	
		const data = await res.json()
	
		//setNotes([...notes, data])
	
	}

	const deleteNote = async (id) => {
		const res = await fetch(`http://localhost:8080/notes/${id}`, {
		  method: 'DELETE',
		})
		//We should control the response status to decide if we will change the state or not.
		// res.status === 200
		//   ? setNotes(notes.filter((note) => note.id !== id))
		//   : alert('Error Deleting This Note')
	}

	const editNote = async (id) => {
		const res = await fetch(`http://localhost:8080/notes/${id}`, {
		  method: 'DELETE',
		})
		//We should control the response status to decide if we will change the state or not.
		// res.status === 200
		//   ? setNotes(notes.filter((note) => note.id !== id))
		//   : alert('Error Deleting This Note')
	}

	return (
		<div className="parent-container">
			{notes.length > 0 ? (
                <Notes
                notes={notes}
				onEdit={editNote}
                onDelete={deleteNote}
                />
            ) : (
                'No Tasks To Show'
            )}
			<a href='/NoteEditor'>Add Note</a>
		</div>
	)
}

export default Home