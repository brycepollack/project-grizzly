import { MdDelete, MdModeEdit, MdInsertDriveFile } from 'react-icons/md'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_NOTE, UPDATE_NOTE } from '../mutations/noteMutations';
import { GET_NOTES, GET_MY_NOTES, GET_NOTE } from '../queries/noteQueries';
import { IconContext } from 'react-icons';
import { UPDATE_FOLDER } from '../mutations/folderMutations';
import { useNavigate } from 'react-router-dom';
import { GET_FOLDER } from '../queries/folderQueries';
import { createRef, useState } from 'react';
import { HiCheck } from 'react-icons/hi';

export default function NoteRow({ parentFolder, note, user }) {
    const navigate = useNavigate();
    const [title, setTitle] = useState(note.title);
    const textarea = createRef();
    const [editing, setEditing] = useState(false);
    
    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: { id: note.id },
        // update(cache, { data: { deleteNote } }) {
        //     const { mynotes } = cache.readQuery({ query: GET_MY_NOTES, variables: { userId : user._id } });
        //     cache.writeQuery({
        //     query: GET_MY_NOTES,
        //     variables: { userId : user._id },
        //     data: {
        //         mynotes: mynotes.filter((note) => note.id !== deleteNote.id),
        //     },
        //     });
        // },
        update(cache, { data: deleteNote }) {
            cache.evict({ id: `Note:${deleteNote.deleteNote.id}`});
        }
    });

    const [updateFolder] = useMutation(UPDATE_FOLDER)

    async function removeNote() {
        let noteId = note.id;
        const { loading, error, data} = await deleteNote();
        if (loading || error) return;

        let subfolderIds = parentFolder.subfolders.map(a => a.id)
        let noteIds = parentFolder.notes.map(a => a.id);
        let filteredNoteIds = noteIds.filter(a => a!=noteId)
        await updateFolder({ variables: {
            id: parentFolder.id,
            name: parentFolder.name,
            subfolders: subfolderIds,
            notes: filteredNoteIds
        }});
    }

    const [updateNote] = useMutation(UPDATE_NOTE, {
        variables: {
            id: note.id, title, text: note.text
        },
        refetchQueries: [{
            query: GET_NOTE, variables: { id: note.id }
        }, {
            query: GET_FOLDER, variables: { id: parentFolder.id}
        }]
    });

    async function completeEdit() {
        textarea.current.disabled = true;
        setEditing(false);
        updateNote(title);
    }

    const handleClick = () => {
        console.log("row " + note.title);
        if (!editing) navigate(`/notes/${note.id}`);
    }

    const handleOnKeyDown = (e) => {
        if (e.keyCode == 13) completeEdit();
    }

    const startEdit = () => {
        setEditing(true);
        textarea.current.disabled = false;
        textarea.current.focus();
    }

    return (
        <tr>
            <td style={{verticalAlign: 'middle'}} onClick={handleClick}>
                <MdInsertDriveFile className='row-icon'/>
                <input ref={textarea} disabled={true} type="text" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={handleOnKeyDown}></input>
            </td>
            <td style={{ textAlign: 'center'}}><div className='last-edited'>Jun 27, 2023 9:03 pm</div></td>
            <td style={{ textAlign: 'center'}}>
                {/* <a href={`/notes/${note.id}`}> */}
            <IconContext.Provider value={{style:{color:"green"}, className:"edit-btn"}}>
                {editing ? <HiCheck onClick={completeEdit}/> : <MdModeEdit onClick={startEdit}/>}
                </IconContext.Provider>
                {/* </a> */}
            </td>
            <td style={{ textAlign: 'center'}}>
                <a onClick={removeNote}>
            <IconContext.Provider value={{className:"delete-btn"}}>
                <MdDelete />
                </IconContext.Provider>
                </a>
            </td>
        </tr>
    );
}