import { MdDelete, MdModeEdit, MdInsertDriveFile } from 'react-icons/md'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_NOTE } from '../mutations/noteMutations';
import { GET_NOTES, GET_MY_NOTES } from '../queries/noteQueries';
import { IconContext } from 'react-icons';

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
            <td style={{verticalAlign: 'middle'}}><MdInsertDriveFile className='file-icon'/>{ note.title }</td>
            <td style={{ textAlign: 'center'}}>
                <a href={`/notes/${note.id}`}>
            <IconContext.Provider value={{style:{color:"green"}, className:"hover-btn"}}>
                <MdModeEdit /></IconContext.Provider></a>
                {/* <a className="btn btn-success btn-sm"
                href={`/notes/${note.id}`}>
                    <MdModeEdit />
                </a> */}
            </td>
            <td style={{ textAlign: 'center'}}>
                <a onClick={deleteNote}>
            <IconContext.Provider value={{style:{color:"red"}, className:"hover-btn"}}>
                <MdDelete /></IconContext.Provider></a>
                {/* <button className="btn btn-danger btn-sm"
                onClick={deleteNote}>
                    <MdDelete />
                </button> */}
            </td>
        </tr>
    );
}