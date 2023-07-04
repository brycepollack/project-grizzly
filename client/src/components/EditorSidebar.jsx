import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { GET_MY_NOTES } from "../queries/noteQueries";
import Spinner from "./Spinner";
import { ADD_NOTE } from "../mutations/noteMutations";
import { useNavigate } from "react-router-dom";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { MdClose, MdExpandMore, MdViewSidebar } from "react-icons/md";
import { BsList } from "react-icons/bs";
import { IoCaretForward } from "react-icons/io5";
import AddNote from "./AddNote";
import AddFolder from "./AddFolder";
import Purge from "./Purge";

export default function EditorSidebar({ user, currNote, parentFolder }) {
  // console.log("curr note is " + currNote);
  // const { loading, error, data } = useQuery(GET_NOTES);

  const { loading, error, data } = useQuery(GET_MY_NOTES, { variables: { userId : user._id } });
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    console.log(sidebar);
    setSidebar(!sidebar);
  };

  const navigate = useNavigate();
  const title = "Untitled";
  const text = "";

  const [addNote] = useMutation(ADD_NOTE, {
    variables: { title : title, text : text, userId : user._id, },
    update(cache, { data: { addNote } }) {
      const { mynotes } = cache.readQuery({ query: GET_MY_NOTES, variables: { userId : user._id } });
      cache.writeQuery({
        query: GET_MY_NOTES,
        variables: { userId : user._id },
        data: { mynotes: [...mynotes, addNote] },
      });
    },
  });

  const createNote = (e) => {
    addNote().then((response) => {
      console.log(response.data);
      navigate(`/note/${response.data.addNote.id}`);
    });
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  console.log(data);

  return (
    <>
      {!loading && !error && (
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

                <div style={{ display: "flex", flexDirection: "row", justifyContent:"space-around"}}>
                  <AddNote parentFolder={parentFolder} user={user} sidebar={true}/>
                  <AddFolder parentFolder={parentFolder} user={user} sidebar={true}/>
                  <Purge user={user}/>
                </div>

                <div style={{fontSize:'0.8em', fontWeight:'700', margin:'30px 0px 0px'}}>MY NOTES</div>

                {data.mynotes.map((note) => {
                  if (note.id == currNote.id) {
                    return (
                      <div className="sidebar-note current-note">
                        {note.title.length > 12
                          ? note.title.substring(0, 12) + ".."
                          : note.title}
                      </div>
                    );
                  } else {
                    return (
                      <a href={`/notes/${note.id}`}>
                        <div className="sidebar-note">
                          {note.title.length > 12
                            ? note.title.substring(0, 12) + ".."
                            : note.title}
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
