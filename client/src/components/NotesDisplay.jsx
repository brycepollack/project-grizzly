import { gql, useQuery } from '@apollo/client';
import NoteRow from './NoteRow';
import { GET_NOTES } from '../queries/noteQueries';
import Spinner from './Spinner';

export default function NotesDisplay() {
    const { loading, error, data } = useQuery(GET_NOTES);

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong</p>;

    // console.log(data.notes);
    return <>{!loading && !error && 
        <table className='table'>
            <thead >
                <tr>
                    <th scope='col'>Title</th>
                    <th scope='col' style={{ textAlign: 'center'}}>Edit</th>
                    <th scope='col' style={{ textAlign: 'center'}}>Delete</th>
                </tr>
            </thead>
            <tbody >
                {data.notes.map((note) => (
                    <NoteRow key={note.id} note={note}></NoteRow>
                ))}
            </tbody>
        </table>
    }
    </>
    
}