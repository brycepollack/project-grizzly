import { useState, useEffect, createRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GET_NOTE, GET_MY_NOTES } from "../queries/noteQueries";
import { UPDATE_NOTE, DELETE_NOTE } from "../mutations/noteMutations";
import '../style/editor.css'
import Preview from "./Preview";

import { MdOutlineDocumentScanner, MdDocumentScanner, MdEditDocument } from 'react-icons/md'

export default function Editor({ user, note }) {
  const navigate = useNavigate();
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
          const { mynotes } = cache.readQuery({ query: GET_MY_NOTES, variables: { userId : user._id } });
          cache.writeQuery({
            query: GET_MY_NOTES,
            variables: { userId : user._id },
            data: {
              mynotes: mynotes.filter((note) => note.id !== deleteNote.id),
            },
          });
        },
        onCompleted: () => {
          navigate(`/`);
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
      textareaRef.current.style.height = '0px';

      if (text.length === 0) {
        textareaRef.current.style.height = '120px';
      } else {
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
      }
    };
  }, [preview]);

  return (
    <>
      <div className="editor-container">
        <div id="title-container">
          {/* <h6 id="title-heading">Title: </h6> */}
          {/* <button id="preview-btn" className="hover-btn" onClick={() => {setPreview(!preview)}}>
            {preview ? (<AiTwotoneEdit size={'1.2em'}/>) : (<HiEye size={'1.2em'}/>)}
          </button> */}
          {/* <PinkSwitch onChange={() => setPreview(!preview)}/> */}

          <div className="preview-toggle" >
            <MdEditDocument className={preview ? "preview-icon inactive" : "preview-icon active"} onClick={() => {setPreview(false)}}/>
            {/* <div className="separator"></div> */}
            <MdDocumentScanner className={preview ? "preview-icon active" : "preview-icon inactive"} onClick={() => setPreview(true)}/>
          </div>

          {/* <button className={preview ? "btn btn-secondary btn-lg preview-btn" : "btn btn-outline-secondary btn-lg preview-btn"} 
          onClick={() => setPreview(!preview)}
          onKeyPress={(e) => e.target.blur()}>
            Preview
          </button> */}
          
          <button className="btn btn-primary btn-lg" onClick={onSubmit}>
            Save
          </button>

          <Link to="/" className="btn btn-secondary btn-lg">
              Back
          </Link>

          <button className="btn btn-danger btn-lg" onClick={deleteNote}>
            Delete
          </button>
        </div>

        <input
            type="text"
            placeholder="Title here..."
            id="title-input"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            style={{height:"75px", flexGrow: "0", flexShrink: "0"}}
          />
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
            placeholder="Start typing here..." 
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
