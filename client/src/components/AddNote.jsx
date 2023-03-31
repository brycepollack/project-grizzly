import { useMutation } from "@apollo/client";
import { ADD_NOTE } from "../mutations/noteMutations";
import { GET_NOTES } from "../queries/noteQueries";
import { useNavigate } from "react-router-dom";

export default function AddNote() {
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
  return (
    <button className="btn-secondary mt-4 btn-sm" onClick={createNote}>
      New note
    </button>
  );
}
