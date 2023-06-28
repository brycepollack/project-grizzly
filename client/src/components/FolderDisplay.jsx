import { gql, useQuery } from '@apollo/client';
import NoteRow from './NoteRow';
import FolderRow from './FolderRow'
import Spinner from './Spinner';
import '../style/note.css'
import AddFolder from './AddFolder'

import { GET_FOLDERS } from '../queries/folderQueries';


export default function FolderDisplay({ folder, user }) {
    //const { loading, error, data } = useQuery(GET_NOTES);
    
    // const { loading, error, data } = useQuery(GET_FOLDERS, { variables: { ids : folder.subfolders } });


    // const { loading, error, data } = useQuery(GET_FOLDER, { variables: {id: folder._id }});
    

    // if (loading) return <Spinner />;
    // if (error) return <p>Something went wrong</p>;

    // console.log(folder.subfolders);

    // var filteredNotes = data.notes.filter(function (note) {
    //     return note.user.id === user._id;
    // });

    // console.log(folder.subfolders);

   
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