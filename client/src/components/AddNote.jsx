import { useMutation } from "@apollo/client";
import { ADD_NOTE } from "../mutations/noteMutations";
import { useNavigate } from "react-router-dom";
import { UPDATE_FOLDER } from "../mutations/folderMutations";
import { GET_FOLDER } from "../queries/folderQueries"
import { BsFillFileEarmarkPlusFill } from 'react-icons/bs'
import { IconContext } from "react-icons";

export default function AddNote({ parentFolder, user, sidebar }) {

  const noteTitle = "Untitled Note";

  //console.log("AddNote - User: " + JSON.stringify(user));

  const navigate = useNavigate();

  const text = "";

  const [addNote] = useMutation(ADD_NOTE, {
    variables: { title : noteTitle, text : text, userId : user._id, },
    // update(cache, { data: { addNote } }) {
      // console.log(addNote);
    //   const { mynotes } = cache.readQuery({ query: GET_MY_NOTES, variables: { userId : user._id } });
    //   cache.writeQuery({
    //     query: GET_MY_NOTES,
    //     variables: { userId : user._id },
    //     data: { mynotes: [...mynotes, addNote] },
    //   });
    // },
  });

  const [updateFolder] = useMutation(UPDATE_FOLDER);

  async function createNote(e) {
    let newNoteId = null;
    const { loading, error, data } = await addNote();
    if (!loading && !error) newNoteId = data.addNote.id;

    let subfolderIds = parentFolder.subfolders.map(a => a.id)
    let noteIds = parentFolder.notes.map(a => a.id);

    // console.log([...noteIds, newNoteId]);

    await updateFolder({variables: { 
      id: parentFolder.id,
      name: parentFolder.name, 
      subfolders: subfolderIds,
      notes: [...noteIds, newNoteId] } ,
    // update(cache, { data }) {
    //   console.log(data);
      // const { folder } = cache.readQuery({ query: GET_FOLDER, variables: { id: parentFolder.id } });
      // console.log(folder);
      // cache.writeQuery({
      //   query: GET_FOLDER,
      //   variables: { id: parentFolder._id },
      //   data: { folder: updateFolder }
      // })
      // cache.modify({
      //   id: cache.identify(parentFolder),
      //   fields: {
      //     name(notes) {
      //       return [...notes, newNoteId]
      //     }
      //   }
      // })
    // },
    onCompleted: (response) => {
      console.log(response);
    },
    refetchQueries: [{
      query: GET_FOLDER,
      variables: { id: parentFolder.id }
    }]
    });
    if (sidebar) {
      // save current note?
      navigate(`/note/${newNoteId}`, {state: { folder: parentFolder }});
    }
  };
  return (
    <>
    {/* <input type="text" placeholder="Untitled note" onChange={(e) => setNoteTitle(e.target.value)} /> */}

    <div onClick={createNote}>
    <IconContext.Provider value={{className:"add-btn"}}>
      <BsFillFileEarmarkPlusFill />
    </IconContext.Provider>
    </div>
    {/* <button className="add-btn" onClick={createNote}>
      <BsFillFileEarmarkPlusFill />
    </button> */}
    </>
  );
}
