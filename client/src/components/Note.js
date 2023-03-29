import { FaEdit, FaTrash } from 'react-icons/fa'

const Note = ({ note, onEdit, onDelete }) => {
  return (
    <div>
      <h3>
        {note.title}{' '}
        <FaEdit
          style={{ color: 'green', cursor: 'pointer' }}
          onClick={() => onEdit(note.id)}
        />
        <FaTrash
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(note.id)}
        />
      </h3>
    </div>
  )
}

export default Note