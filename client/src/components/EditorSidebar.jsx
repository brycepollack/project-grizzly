import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MY_NOTES } from "../queries/noteQueries";
import { GET_MY_FOLDERS } from "../queries/folderQueries";
import Spinner from "./Spinner";

import { IconContext } from "react-icons";
import { BsList } from "react-icons/bs";
//import Purge from "./Purge";

export default function EditorSidebar({ user, currNote, parentFolder }) {
  // console.log("curr note is " + currNote);
  // const { loading, error, data } = useQuery(GET_NOTES);

  const myNotesRes = useQuery(GET_MY_NOTES, { variables: { userId : user._id } });
  const myFoldersRes = useQuery(GET_MY_FOLDERS, { variables: { userId : user._id } });
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  if (myNotesRes.loading) return <Spinner />;
  if (myNotesRes.error) return <p>Something went wrong</p>;
  if (myFoldersRes.loading) return <Spinner />;
  if (myFoldersRes.error) return <p>Something went wrong</p>;

  return (
    <>
      {!myNotesRes.loading && !myNotesRes.error && !myFoldersRes.loading && !myFoldersRes.error && (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <IconContext.Provider
              value={{ style: { color: "black" }, className: "hover-btn" }}
            >
              <BsList onClick={showSidebar} />
            </IconContext.Provider>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
              <div className="nav-menu-items" onClick={showSidebar}>

                {/* <div className="sidebar-button" onClick={createNote}>
                  New note
                </div> */}

                <div style={{fontSize:'0.8em', fontWeight:'700', margin:'30px 0px 0px'}}>MY NOTES</div>

                {myNotesRes.data.mynotes.map((note) => {
                  if (note.id === currNote.id) {
                    return (
                      <div className="sidebar-note current-note">
                        {note.title.length > 12
                          ? note.title.substring(0, 12) + ".."
                          : note.title}
                      </div>
                    );
                  } else {
                    return (
                      <a href={`/note/${note.id}`}>
                        <div className="sidebar-note">
                          {note.title.length > 12
                            ? note.title.substring(0, 12) + ".."
                            : note.title}
                        </div>
                      </a>
                    );
                  }
                })}

              <div style={{fontSize:'0.8em', fontWeight:'700', margin:'30px 0px 0px'}}>MY FOLDERS</div>

              {myFoldersRes.data.myfolders.map((folder) => {
                  if (folder.id === parentFolder.id) {
                    return (
                      <div className="sidebar-note current-note">
                        {folder.name.length > 12
                          ? folder.name.substring(0, 12) + ".."
                          : folder.name}
                      </div>
                    );
                  } else {
                    return (
                      <a href={`/folder/${folder.id}`}>
                        <div className="sidebar-note">
                          {folder.name.length > 12
                            ? folder.name.substring(0, 12) + ".."
                            : folder.name}
                        </div>
                      </a>
                    );
                  }
                })}

              </div>
            </nav>
          </div>
      )}
    </>
  );
}
