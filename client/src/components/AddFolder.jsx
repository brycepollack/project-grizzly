import { useMutation } from "@apollo/client";
import { ADD_FOLDER, UPDATE_FOLDER } from "../mutations/folderMutations";
// import { ADD_NOTE } from "../mutations/noteMutations";
// import { GET_NOTES, GET_MY_NOTES } from "../queries/noteQueries";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { MdCreateNewFolder } from 'react-icons/md';
import { IconContext } from "react-icons";
import { GET_FOLDER } from "../queries/folderQueries";

export default function AddFolder({ user, parentFolder, sidebar }) {
  // console.log("parent folder");
  // console.log(parentFolder);

  //console.log("AddNote - User: " + JSON.stringify(user));

  const [folderName, setFolderName] = useState("Untitled Folder");

  const navigate = useNavigate();

  const name = "Untitled folder"

  const [addFolder] = useMutation(ADD_FOLDER, {
      variables: { name : folderName, userId : user._id, subfolders : [], notes : []},
        // update(cache, { data: { addNote } }) {
        // const { mynotes } = cache.readQuery({ query: GET_MY_NOTES, variables: { userId : user._id } });
        // cache.writeQuery({
        //     query: GET_MY_NOTES,
        //     variables: { userId : user._id },
        //     data: { mynotes: [...mynotes, addNote] },
        // });
        // },
        // onCompleted: (data) => {
        //   console.log(data);
        // }
  });

    // will need to update cache
    const [updateFolder] = useMutation(UPDATE_FOLDER);

  async function createFolder(e) {
    let newFolderID = null;
    const { loading, error, data } = await addFolder();
    if (!loading && !error) newFolderID = data.addFolder.id;

    let subfolderIds = parentFolder.subfolders.map(a => a.id)
    let noteIds = parentFolder.notes.map(a => a.id);
    await updateFolder({variables: { 
      id: parentFolder.id,
      name: parentFolder.name, 
      subfolders: [...subfolderIds, newFolderID],
      notes: noteIds
    },
    onCompleted: (response) => {
      console.log(response)
    },
    refetchQueries: [{
      query: GET_FOLDER,
      variables: { id: parentFolder.id }
    }]  
  });

  if (sidebar) {
    // save current note?

    // PATH???????????????
    navigate(`/folder/${newFolderID}`);
  }
  };
  return (
    <>
    {/* <input type="text" placeholder="Untitled folder" onChange={(e) => {setFolderName(e.target.value)}} /> */}
    <a onClick={createFolder}>
    <IconContext.Provider value={{className:"hover-btn"}}>
      <MdCreateNewFolder />
    </IconContext.Provider>
    </a>
    {/* <button className="add-btn" onClick={createFolder}>
      <MdCreateNewFolder />
    </button> */}
    </>
  );
}
