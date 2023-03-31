import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Editor from "../components/Editor";
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
          {/* <h1>{data.note.title}</h1> */}

          <Editor note={data.note} />

          <Link to="/" className="btn btn-secondary">
            Back
          </Link>
        </>
      )}
    </>
  );
}
