import { gql, useQuery } from '@apollo/client';
import NoteRow from './NoteRow';
import { GET_NOTES } from '../queries/noteQueries';
import Spinner from './Spinner';

export default function Notes() {
    const { loading, error, data } = useQuery(GET_NOTES);

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong</p>;

    // console.log(data.notes);
    return <>{!loading && !error && 
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Text</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {data.notes.map((note) => (
                <NoteRow key={note.id} note={note}></NoteRow>
            ))}
        </tbody>
    </table>
    }</>
}