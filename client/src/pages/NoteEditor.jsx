import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Editor from "../components/Editor";
import EditorSidebar from "../components/EditorSidebar"
import { useQuery } from "@apollo/client";
import { GET_NOTE } from "../queries/noteQueries";
import { useState } from "react";

export default function NoteEditor({ user }) {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;
  if (data.note.user.id !== user._id) return <p>Something Went Wrong</p>;
  //console.log("Note owner id " + JSON.stringify(data.note.user.id))
  //console.log("User id " + JSON.stringify(user._id))
  //else setInput(data.note.text);

  return (
    <>
      {!loading && !error && (
        <div className="editor-parent">
            <EditorSidebar user={ user } currNote={data.note}/>
            <Editor user={user} note={data.note} />
        </div>
      )}</>
  );
}
