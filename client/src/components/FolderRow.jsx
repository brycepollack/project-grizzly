import { MdDelete, MdModeEdit, MdFolder } from 'react-icons/md'
import { HiCheck } from 'react-icons/hi'
import { useMutation } from '@apollo/client';
// import { DELETE_NOTE } from '../mutations/noteMutations';
// import { GET_NOTES, GET_MY_NOTES } from '../queries/noteQueries';
import { IconContext } from 'react-icons';
import { useNavigate } from 'react-router-dom';
import { createRef, useState } from 'react';
import { DELETE_FOLDER, UPDATE_FOLDER } from '../mutations/folderMutations';
import { GET_FOLDER } from '../queries/folderQueries';

export default function FolderRow({ parentFolder, folder, user }) {
    

    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(folder.name);

    const navigate = useNavigate();
    const textarea = createRef();


    let subfolderIds = folder.subfolders.map(a => a.id)
    let noteIds = folder.notes.map(a => a.id);

    const [updateFolder] = useMutation(UPDATE_FOLDER, {
        onCompleted: (response) => {
            console.log(response);
        },
        refetchQueries: [
            // {
            //     query: GET_FOLDER,
            //     variables: { id: folder.id }
            // }, 
        {
            query: GET_FOLDER,
            variables: { id: parentFolder.id }
        }]
    });

    const handleClick = () => {
        if (!editing) navigate(`/folder/${folder.id}`);
    }

    const startEdit = () => {
        setEditing(true);
        textarea.current.disabled = false;
        textarea.current.focus();
    }

    async function completeEdit() {
        textarea.current.disabled = true;
        setEditing(false);
        // update folder with new name
        await updateFolder({
            variables: { 
                id: folder.id,
                name: name, // new
                subfolders: subfolderIds, // new
                notes: noteIds },
            })
        // if (!loading && !error) console.log(data);
    }

    const handleOnKeyDown = (e) => {
        let key = e.keyCode;
        // console.log("key down: " + key);
        if (key === 13) completeEdit();
    }

    const [deleteFolder] = useMutation(DELETE_FOLDER, {
        variables: {
            id: folder.id
        },
        update(cache, { data: deleteFolder }) {
            cache.evict({ id: `Folder:${deleteFolder.deleteFolder.id}`});
        }
    })

    async function removeFolder() {
        let removedId = folder.id;
        // console.log(removedId);

        const { loading, error } = await deleteFolder();
        if (loading || error) return;

        let origIds = parentFolder.subfolders.map((f) => (f.id))

        let filteredIds = origIds.filter( (id) => (id !== removedId));
        
        let parentNoteIds = parentFolder.notes.map((n) => (n.id));

        updateFolder({
            variables: {
                id: parentFolder.id,
                name: parentFolder.name,
                subfolders: filteredIds,
                notes: parentNoteIds
            }
        })

    }


    return (
        <tr >
            <td style={{}} onClick={handleClick}><MdFolder className='row-icon'/>
                {/* {editing ? <RxCheck className='row-icon' onClick={completeEdit}/> : } */}
            <input ref={textarea} disabled={true} type="text" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={handleOnKeyDown}></input>
            </td>
            <td style={{ textAlign: 'center'}}><div className='last-edited'>--</div></td>
            <td style={{ textAlign: 'center'}}>
                {/* <a href={`/notes/${note.id}`}> */}
            <IconContext.Provider value={{style:{color:"green"}, className:"edit-btn"}}>
                {editing ? <HiCheck onClick={completeEdit}/> : <MdModeEdit onClick={startEdit}/>}</IconContext.Provider>
                {/* </a> */}
            </td>
            <td style={{ textAlign: 'center'}}>
                <div onClick={removeFolder}>
            <IconContext.Provider value={{className:"delete-btn"}}>
                <MdDelete /></IconContext.Provider>
                </div>
            </td>
        </tr>
    );
}