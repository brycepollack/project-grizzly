import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom"
import { GET_FOLDER } from "../queries/folderQueries";
import Spinner from "../components/Spinner";
import FolderDisplay from "../components/FolderDisplay";
import AddFolder from "../components/AddFolder";
import AddNote from "../components/AddNote";
import FolderPath from "../components/FolderPath";
import Purge from "../components/Purge";


export default function Folder({ user }) {
    const { id } = useParams();
    const { loading, error, data} = useQuery(GET_FOLDER, { variables: { id }})

    if (loading) return <Spinner />
    if (error) return <p>Something Went Wrong</p>;

    if (data.folder.user.id !== user._id) return <p>User not authorized to view this folder</p>

    var path = JSON.parse(localStorage.getItem("path"));
    // let index = path.indexOf(data.folder.name);
    let index = path.findIndex(item => item.id == data.folder.id);

    // console.log(index);

    if (index == -1) {
        path = [...path, data.folder];
        localStorage.setItem("path", JSON.stringify(path));
    } else if (index >= 0 && index < path.length - 1) {
        path = path.slice(0, index);
        localStorage.setItem("path", JSON.stringify(path));
    }

    return (
        <>
            <div className='container'>

            {/* <FolderPath path={path} /> */}
            
            <div style={{display:"flex", flexDirection:"row", 
                    alignItems:"center",
                    justifyContent:"center", gap:"10px"}} >
                    <div style={{ flexGrow: '10' }}> 
                    <FolderPath path = {path}/>
                    </div>
                    <AddNote parentFolder={data.folder} user={user} />
                    <AddFolder parentFolder={data.folder} user={user} />
                    <Purge user={user} />

                    </div>

                <div className='d-flex justify-content-center flex-nowrap'>
                    <FolderDisplay folder={data.folder} user={user} /> 
                </div>
            </div>

            {/* <div className='d-flex justify-content-center flex-nowrap'>
                <AddNote parentFolder={data.folder} user={user} />
            </div>
            <div className='d-flex justify-content-center flex-nowrap'>
                <AddFolder parentFolder={data.folder} user={user}/>
            </div> */}
        </>
    )
}