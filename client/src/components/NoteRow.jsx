import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client';
import { DELETE_NOTE } from '../mutations/noteMutations';
import { GET_NOTES } from '../queries/noteQueries';

export default function NoteRow({ note }) {
    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: { id: note.id },
        update(cache, { data: { deleteNote } }) {
              const { notes } = cache.readQuery({ query: GET_NOTES });
              cache.writeQuery({
                query: GET_NOTES,
                data: {
                  notes: notes.filter((note) => note.id !== deleteNote.id),
                },
              });
            },
    });
    return (
        <tr>
            <td>{ note.title }</td>
            <td>{ note.text }</td>
            <td>
                <button className="btn btn-danger btn-sm"
                onClick={deleteNote}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
}