import { gql, useQuery } from '@apollo/client';
import NoteRow from './NoteRow';
import { GET_NOTES, GET_MY_NOTES } from '../queries/noteQueries';
import Spinner from './Spinner';

export default function NotesDisplay({ user }) {
    //const { loading, error, data } = useQuery(GET_NOTES);
    
    const { loading, error, data } = useQuery(GET_MY_NOTES, { variables: { userId : user._id } });
    

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong</p>;

    // var filteredNotes = data.notes.filter(function (note) {
    //     return note.user.id === user._id;
    // });

   
    return <>{!loading && !error && 
        <table className='table'>
            <thead >
                <tr>
                    <th scope='col'>Title</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
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