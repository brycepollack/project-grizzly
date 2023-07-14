import NoteRow from './NoteRow';
import FolderRow from './FolderRow'
import '../style/note.css'


export default function FolderDisplay({ folder, user }) {

   
    return <>
        <table className='table'>
            <thead >
                <tr>
                    <th scope='col' style={{ textAlign: 'left', fontSize: "0.8em"}}>Name</th>
                    <th scope='col' style={{ textAlign: 'center', fontSize: "0.8em"}}>Last Edited</th>
                    <th scope='col' style={{ textAlign: 'center'}}></th>
                    <th scope='col' style={{ textAlign: 'center'}}></th>
                </tr>
            </thead>
            <tbody >
                {folder.subfolders.map((subfolder) => (
                    <FolderRow key={subfolder.id} parentFolder={folder} folder={subfolder} user={user} />
                ))}
                {folder.notes.map((note) => (
                    <NoteRow key={note.id} parentFolder={folder} note={note} user={user} />
                ))}
            </tbody>
        </table>
    </>
    
}