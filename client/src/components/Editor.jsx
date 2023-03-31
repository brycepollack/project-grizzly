import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_NOTE } from "../queries/noteQueries";
import { UPDATE_NOTE } from "../mutations/noteMutations";
import Preview from "./Preview";

export default function Editor({ note }) {
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

  const [updateNote] = useMutation(UPDATE_NOTE, {
    variables: { id: note.id, title, text },
    refetchQueries: [{ query: GET_NOTE, variables: { id: note.id } }],
  });

  const onSubmit = (e) => {
    //e.preventDefault();

    // if (!name || !description || !status) {
    //   return alert("Please fill out all fields");
    // }

    updateNote(title, text);
  };

  return (
    <div className="editor">
    
			<div className="editor-child border rounded">
                <textarea
                    className="text-display"
                    style={{resize: "none"}}
                    id="input"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
			</div>

            <div className="editor-child border rounded"
            style={{
                overflow: "auto"}}>
				<Preview text={text}/>
			</div>

            <button className="btn btn-primary"
            onClick={onSubmit}>
                Save
            </button>

	</div>
  );
}