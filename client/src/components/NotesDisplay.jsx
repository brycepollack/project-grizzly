import { useQuery } from '@apollo/client';
import NoteRow from './NoteRow';
import { GET_MY_NOTES } from '../queries/noteQueries';
import Spinner from './Spinner';
import '../style/note.css'



export default function NotesDisplay({ user }) {
    //const { loading, error, data } = useQuery(GET_NOTES);
    
    const { loading, error, data } = useQuery(GET_MY_NOTES, { variables: { userId : user._id } });


    // const { loading, error, data } = useQuery(GET_FOLDER, { variables: {id: "649659a32eb5c1485f2c4fda" }});
    

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong</p>;

    // console.log(data);

    // var filteredNotes = data.notes.filter(function (note) {
    //     return note.user.id === user._id;
    // });

   
    return <>{!loading && !error && 
        <table className='table'>
            <thead >
                <tr>
                    <th scope='col' style={{ textAlign: 'left'}}>Title</th>
                    <th scope='col' style={{ textAlign: 'center'}}>Edit</th>
                    <th scope='col' style={{ textAlign: 'center'}}>Delete</th>
                </tr>
            </thead>
            <tbody >
                {data.mynotes.map((note) => (
                    <NoteRow key={note.id} note={note} user={user}></NoteRow>
                ))}
            </tbody>
        </table>
    }
    </>
    
}