import NotesDisplay from '../components/NotesDisplay';
import AddNote from '../components/AddNote';
import AddFolder from '../components/AddFolder';

export default function Home({ user }) {

    //console.log("Home - User: " + JSON.stringify(user));

    return (
        <>
            {user ? (
                <>
                <div className='container'>
                    <div className='d-flex justify-content-center flex-nowrap'>
                        <NotesDisplay user={user} /> 
                    </div>
                </div>

                <div className='d-flex justify-content-center flex-nowrap'>
                    <AddNote user={user} />
                </div>
                <div className='d-flex justify-content-center flex-nowrap'>
                    <AddFolder user={user}/>
                </div>
                </>

            ) : (

                <div className='container'>
                    <div className='d-flex justify-content-center flex-nowrap'>
                        <span>Something went wrong</span> 
                    </div>
                </div>
            )}
            
        </>
    );
}