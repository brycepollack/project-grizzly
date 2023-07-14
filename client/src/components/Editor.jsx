import { useState, useEffect, createRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GET_NOTE, GET_MY_NOTES } from "../queries/noteQueries";
import { UPDATE_NOTE, DELETE_NOTE } from "../mutations/noteMutations";
import { UPDATE_FOLDER } from "../mutations/folderMutations";
import '../style/editor.css'
import Preview from "./Preview";

import { MdOutlineDocumentScanner, MdDocumentScanner, MdEditDocument } from 'react-icons/md'

export default function Editor({ user, note, parentFolder }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [lastEditedAt, setLastEditedAt] = useState(Date.now);
  const [preview, setPreview] = useState(false);
  const [editor, setEditor] = useState(true);
  const textareaRef = createRef();

  const [updateNote] = useMutation(UPDATE_NOTE, {
    variables: { id: note.id, title, text, lastEditedAt },
    refetchQueries: [{ query: GET_NOTE, variables: { id: note.id } }],
  });

  const [deleteNote] = useMutation(DELETE_NOTE, {
      variables: { id: note.id },
  });

  const [updateFolder] = useMutation(UPDATE_FOLDER)

  // async function removeNote() {
  //     let noteId = note.id;
  //     const { loading, error, data } = await deleteNote();
  //     if (loading || error) return;

  //     let subfolderIds = parentFolder.subfolders.map(a => a.id)
  //     let noteIds = parentFolder.notes.map(a => a.id);
  //     let filteredNoteIds = noteIds.filter(a => a!=noteId)

  //     await updateFolder({ variables: {
  //         id: parentFolder.id,
  //         name: parentFolder.name,
  //         subfolders: subfolderIds,
  //         notes: filteredNoteIds
  //     }});

  //     navigate(`/home`);
  // }

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      return alert("Please fill out title");
    }

    setLastEditedAt(Date.now)

    updateNote(title, text, lastEditedAt);
  };

  // adjust textarea height on typing
  const onChangeHandler = (e) => {
    setText(e.target.value);
    // e.target.style.height = `${e.target.scrollHeight}px`;

    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
  }

  // adjust textarea height on mount
  useEffect(() => {
    if (editor) {
      console.log(textareaRef.current.scrollHeight);
      textareaRef.current.style.height = '0px';

      if (text.length === 0) {
        textareaRef.current.style.height = '120px';
      } else {
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
      }
    };
  }, [editor, preview]);

  const displayMode = (mode) => {
    if (mode == 'edit') {
      if (!editor) {
        setEditor(true);
      } else {
        setPreview(true);
        setEditor(false);
      }
    } else if (mode == 'preview') {
      if (!preview) {
        setPreview(true);
      } else {
        setEditor(true);
        setPreview(false);
      }
    }
  }

  return (
    <>
      <div className="editor-container">
        <div id="title-container">

          <div className="preview-toggle" >
            <MdEditDocument className={editor ? "preview-icon active" : "preview-icon inactive"} onClick={() => displayMode('edit')}/>
            {/* <div className="separator"></div> */}
            <MdDocumentScanner className={preview ? "preview-icon active" : "preview-icon inactive"} onClick={() => displayMode('preview')}/>
          </div>

          
          <button className="btn btn-primary btn-lg" onClick={onSubmit}>
            Save
          </button>

          <Link to="/home" className="btn btn-secondary btn-lg">
              Home
          </Link>

          
        </div>

        <input
            type="text"
            placeholder="Title here..."
            id="title-input"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            style={{height:"75px", flexGrow: "0", flexShrink: "0"}}
          />
          <div className="editor-child"
          style={{ gap: ( editor && preview ? "10px" : "0px") }}>
            <textarea 
            ref={textareaRef}
            type="text" 
            value={text} 
            // style={{ display: (editor ? "block" : "none") }}
            // className="text-display"
            className={( editor? "text-display" : "text-display inactive")}
            placeholder="Start typing here..." 
            onChange={onChangeHandler} />
            <Preview text={text} show={preview}/>
            
          </div>
        </div>
      
    </>
  );
}
