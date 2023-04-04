import NotesDisplay from '../components/NotesDisplay';
import AddNote from '../components/AddNote';

export default function Home() {
    return (
        <>
            <div className='container'>
                <div className='d-flex justify-content-center flex-nowrap'>
                    <NotesDisplay /> 
                </div>
            </div>
            
            <div className='d-flex justify-content-center flex-nowrap'>
                <AddNote />
            </div>
        </>
    );
}