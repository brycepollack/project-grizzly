import { useMutation, useQuery } from "@apollo/client";
import { ADD_FOLDER } from "../mutations/folderMutations";
// import { ADD_NOTE } from "../mutations/noteMutations";
// import { GET_NOTES, GET_MY_NOTES } from "../queries/noteQueries";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function AddFolder({ user }) {

  //console.log("AddNote - User: " + JSON.stringify(user));

  const navigate = useNavigate();

//   const title = "Untitled";
//   const text = "";

    const name = "Untitled folder"

    const [addFolder] = useMutation(ADD_FOLDER, {
        variables: { name : name, userId : user._id, subfolders : [], notes : []},
        // update(cache, { data: { addNote } }) {
        // const { mynotes } = cache.readQuery({ query: GET_MY_NOTES, variables: { userId : user._id } });
        // cache.writeQuery({
        //     query: GET_MY_NOTES,
        //     variables: { userId : user._id },
        //     data: { mynotes: [...mynotes, addNote] },
        // });
        // },
    });

  const createFolder = (e) => {
    addFolder().then((response) => {
      console.log(response.data);
    //   navigate(`/notes/${response.data.addNote.id}`);
    });
  };
  return (
    <button className="btn btn-primary btn-lg" onClick={createFolder}>
      New folder
    </button>
  );
}
