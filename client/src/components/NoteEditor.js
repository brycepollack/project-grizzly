import { useState } from 'react'

//import db from '.../db.json'


const NoteEditor = () => {
    const [text, setText] = useState('')
    const [title, setTitle] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!title) {
            alert('Please add a title')
            return
        }

        if (!text) {
            alert('Please add a task')
            return
        }


        addNote({ title, text })

        //setText('')
        //setTitle('')

    }

    const addNote = async (note) => {

        const id = Math.floor(Math.random() * 10000) + 1
        const newNote = { id, ...note }
        const res = await fetch('http://localhost:8080/notes', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newNote),
        })

        const data = await res.json()

        //setNotes([...notes, data])
    }



    return (
        <div className='parent-container'>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Title</label>
                    <input
                        type='text'
                        placeholder='Untitled Note'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label>Text</label>
                    <input
                        type='text'
                        placeholder='Sample Text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <input type='submit' value='Add Note' className='btn btn-block' />
            </form>

            <a href='/'>Back to home!</a>
        </div>
    )
}

export default NoteEditor