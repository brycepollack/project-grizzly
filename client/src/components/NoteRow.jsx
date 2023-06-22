import { FaTrash, FaEdit } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_NOTE } from '../mutations/noteMutations';
import { GET_NOTES, GET_MY_NOTES } from '../queries/noteQueries';

export default function NoteRow({ note, user }) {
    
    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: { id: note.id },
        update(cache, { data: { deleteNote } }) {
            const { mynotes } = cache.readQuery({ query: GET_MY_NOTES, variables: { userId : user._id } });
            cache.writeQuery({
            query: GET_MY_NOTES,
            variables: { userId : user._id },
            data: {
                mynotes: mynotes.filter((note) => note.id !== deleteNote.id),
            },
            });
        },
    });
    return (
        <tr>
            <td>{ note.title }</td>
            <td>
                <a className="btn btn-success btn-sm"
                href={`/notes/${note.id}`}>
                    <FaEdit />
                </a>
            </td>
            <td>
                <button className="btn btn-danger btn-sm"
                onClick={deleteNote}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
}