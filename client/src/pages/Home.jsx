import AddNote from '../components/AddNote';
import AddFolder from '../components/AddFolder';

import { useQuery } from '@apollo/client';
import { GET_FOLDER } from '../queries/folderQueries';
import Spinner from '../components/Spinner';
import FolderDisplay from '../components/FolderDisplay'
import FolderPath from '../components/FolderPath';
//import Purge from '../components/Purge';

export default function Home({ user }) {

    //console.log("Home - User: " + JSON.stringify(user));

    // get the home folder & display

    const { loading, error, data } = useQuery(GET_FOLDER, { variables: { id: user.homeFolder }});
    

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong</p>;

    // console.log(data);

    // let path = ["home"];
    let path = [data.folder];
    localStorage.setItem("path", JSON.stringify(path));

    return (
        <>
            {user ? (
                <>
                <div className='container'>

                    <div style={{display:"flex", flexDirection:"row", 
                    alignItems:"center",
                    justifyContent:"center", gap:"10px"}} >
                    
                    <div style={{ flexGrow: '10' }}> 
                    <FolderPath path = {path}/>
                    </div>

                    <AddNote parentFolder={data.folder} user={user} sidebar={false}/>
                    <AddFolder parentFolder={data.folder} user={user} sidebar={false}/>

                    </div>

                    <div className='d-flex justify-content-center flex-nowrap'>
                        <FolderDisplay folder={data.folder} user={user} /> 
                    </div>
                </div>

                {/* <AddDropdown parentFolder={data.folder} user={user} /> */}
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