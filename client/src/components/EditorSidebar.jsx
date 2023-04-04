import { gql, useQuery } from '@apollo/client';
import NoteRow from './NoteRow';
import { GET_NOTES } from '../queries/noteQueries';
import Spinner from './Spinner';

export default function EditorSidebar() {
    const { loading, error, data } = useQuery(GET_NOTES);

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong</p>;

    return <>{!loading && !error && 
        <div className="ui inverted left vertical sidebar menu">
            <h3 className="ui teal top header" id="siteTitle">
                Project Grizzly
            </h3>
            <ul className="sidenav">
                {data.notes.map((note) => (
                    <a href={`/notes/${note.id}`} className="nav-link">
                        <li className='button-text'>
                            { note.title }
                        </li>
                    </a>
                ))}
            </ul>
        </div>
    }
    </>
    
}