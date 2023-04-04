import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Editor from "../components/Editor";
import EditorSidebar from "../components/EditorSidebar"
import { useQuery } from "@apollo/client";
import { GET_NOTE } from "../queries/noteQueries";

export default function NoteEditor() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;
  //else setInput(data.note.text);

  return (
    <>
      {!loading && !error && (
        <>

          <div className="parent-container">
            <EditorSidebar />
            <div className="editor-container">
              <Editor note={data.note} />
            </div>
          </div>

        </>
      )}
    </>
  );
}
