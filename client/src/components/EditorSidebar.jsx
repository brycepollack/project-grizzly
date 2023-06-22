import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { GET_NOTES } from "../queries/noteQueries";
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

export default function EditorSidebar({ currNote }) {
  // console.log("curr note is " + currNote);
  const { loading, error, data } = useQuery(GET_NOTES);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    console.log(sidebar);
    setSidebar(!sidebar);
  };


  const navigate = useNavigate();

  const title = "Untitled";
  const text = "";

  const [addNote] = useMutation(ADD_NOTE, {
    variables: { title, text },
    update(cache, { data: { addNote } }) {
      const { notes } = cache.readQuery({ query: GET_NOTES });

      cache.writeQuery({
        query: GET_NOTES,
        data: { notes: [...notes, addNote] },
      });
    },
  });

  const createNote = (e) => {
    addNote().then((response) => {
      console.log(response.data);
      navigate(`/notes/${response.data.addNote.id}`);
    });
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

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

                <div className="sidebar-button" onClick={createNote}>
                  New note
                </div>

                <div style={{fontSize:'0.8em', fontWeight:'700', margin:'30px 0px 0px'}}>MY NOTES</div>

                {data.notes.map((note) => {
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
