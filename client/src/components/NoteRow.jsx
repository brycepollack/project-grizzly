import { MdDelete, MdModeEdit, MdInsertDriveFile } from 'react-icons/md'
import { useMutation } from '@apollo/client';
import { DELETE_NOTE, UPDATE_NOTE } from '../mutations/noteMutations';
import { GET_NOTE } from '../queries/noteQueries';
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

    var converted = new Date(note.lastEditedAt)
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    var timeString = converted.toLocaleString("en-US", options)

    
    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: { id: note.id },
        
        update(cache, { data: deleteNote }) {
            cache.evict({ id: `Note:${deleteNote.deleteNote.id}`});
        }
    });

    const [updateFolder] = useMutation(UPDATE_FOLDER)

    async function removeNote() {
        let noteId = note.id;
        const { loading, error } = await deleteNote();
        if (loading || error) return;

        let subfolderIds = parentFolder.subfolders.map(a => a.id)
        let noteIds = parentFolder.notes.map(a => a.id);
        let filteredNoteIds = noteIds.filter(a => a!==noteId)
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
        if (!editing) navigate(`/note/${note.id}`, {state: { folder: parentFolder }});
    }

    const handleOnKeyDown = (e) => {
        if (e.keyCode === 13) completeEdit();
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
            <td style={{ textAlign: 'center'}}><div className='last-edited'>{timeString}</div></td>
            <td style={{ textAlign: 'center'}}>
                {/* <a href={`/notes/${note.id}`}> */}
            <IconContext.Provider value={{style:{color:"green"}, className:"edit-btn"}}>
                {editing ? <HiCheck onClick={completeEdit}/> : <MdModeEdit onClick={startEdit}/>}
                </IconContext.Provider>
                {/* </a> */}
            </td>
            <td style={{ textAlign: 'center'}}>
                <div onClick={removeNote}>
            <IconContext.Provider value={{className:"delete-btn"}}>
                <MdDelete />
                </IconContext.Provider>
                </div>
            </td>
        </tr>
    );
}