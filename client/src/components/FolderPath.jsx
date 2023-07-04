
import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function FolderPath({path}) {

    const navigate = useNavigate();

    return (
        <div 
        style={{display:"flex", flexDirection:"row", gap:"4px", alignItems:"center", marginBottom:"10px"}}>
            <div onClick={() => navigate(`/home`)} className="path-folder">
                {path[0].name}
            </div>

            {path.slice(1).map((p) => (
                <>
                    <FaChevronRight />
                    <div 
                    className="path-folder" 
                    onClick={() => (navigate(`/folder/${p.id}`))}>
                        { p.name }
                    </div>
                </>
            ))}
        </div>
    )
}