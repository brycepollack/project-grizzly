import { useState, useEffect, createRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GET_NOTE, GET_NOTES } from "../queries/noteQueries";
import { UPDATE_NOTE, DELETE_NOTE } from "../mutations/noteMutations";
import styles from '../style/editor.css'
import Preview from "./Preview";
import { HiEye } from 'react-icons/hi'
import { AiTwotoneEdit } from 'react-icons/ai'

export default function Editor({ note }) {
  const navigate = useNavigate();
  // console.log("editor note " + note);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [preview, setPreview] = useState(false);
  const textareaRef = createRef();

  const [updateNote] = useMutation(UPDATE_NOTE, {
    variables: { id: note.id, title, text },
    refetchQueries: [{ query: GET_NOTE, variables: { id: note.id } }],
  });

  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: { id: note.id },
    update(cache, { data: { deleteNote } }) {
          const { notes } = cache.readQuery({ query: GET_NOTES });
          cache.writeQuery({
            query: GET_NOTES,
            data: {
              notes: notes.filter((note) => note.id !== deleteNote.id),
            },
          });
        },
        onCompleted: () => {
          navigate(`/notes`);
        }
    });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      return alert("Please fill out title");
    }

    updateNote(title, text);
  };

  // adjust textarea height on typing
  const onChangeHandler = (e) => {
    setText(e.target.value);
    // e.target.style.height = `${e.target.scrollHeight}px`;

    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
  }

  // adjust textarea height on mount
  useEffect(() => {
    if (!preview) {
      console.log(textareaRef.current.scrollHeight);
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    };
  }, [preview]);

  return (
    <>
      <div className="editor-container">
        <div id="title-container">
          {/* <h6 id="title-heading">Title: </h6> */}
          <input
            type="text"
            placeholder="Title here..."
            id="title-input"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <button id="preview-btn" className="hover-btn" onClick={() => {setPreview(!preview)}}>
            {preview ? (<AiTwotoneEdit size={'1.2em'}/>) : (<HiEye size={'1.2em'}/>)}
          </button>
          <button id="save-btn" className="btn btn-primary btn-lg" onClick={onSubmit}>
            Save
          </button>

          <Link id="back-btn" to="/notes" className="btn btn-secondary btn-lg">
              Back
          </Link>

          <button id="delete-btn" className="btn btn-danger btn-lg" onClick={deleteNote}>
            Delete
          </button>
        </div>
        {/* <div className="editor"> */}

          {/* <div className="editor-child">
            
          </div> */}
          <div className="editor-child">
            {preview ? (<Preview text={text} />) : (<textarea 
            ref={textareaRef}
            type="text" 
            value={text} 
            style={{}}
            className="text-display" 
            onChange={onChangeHandler} />) }
            
          </div>
          {/* <div className="editor-child border rounded">
            <textarea
              className="text-display"
              style={{ resize: "none" }}
              id="input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div
            className="editor-child border rounded"
            style={{
              overflow: "auto",
            }}
          >
            <Preview text={text} />
          </div> */}
        </div>
      {/* </div> */}
      
    </>
  );
}
