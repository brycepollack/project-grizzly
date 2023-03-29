import Note from './Note'

const Notes = ({ notes, onEdit, onDelete }) => {
  return (
    <>
      {notes.map((note, index) => (
        <Note key={index} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </>
  )
}

export default Notes