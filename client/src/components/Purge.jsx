import { useMutation, useQuery } from "@apollo/client";
import { ADD_NOTE, DELETE_NOTE } from "../mutations/noteMutations";
import { GET_NOTES, GET_MY_NOTES } from "../queries/noteQueries";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { DELETE_FOLDER, UPDATE_FOLDER } from "../mutations/folderMutations";
import { GET_FOLDER } from "../queries/folderQueries"
import { MdCreateNewFolder } from 'react-icons/md';
import { BsFillFileEarmarkPlusFill } from 'react-icons/bs'
import { IconContext } from "react-icons";
import { FaSkull } from "react-icons/fa";

export default function Purge({ user }) {

  // console.log("Purge user: " + user)
  // console.log("Purge homefolder: " + user.homeFolder)

  const navigate = useNavigate();

  // maybe better way to get home folder?
  const { loading, error, data } = useQuery(GET_FOLDER, { variables: { id: user.homeFolder }});

  console.log("Purge data: " + data)

  const folderIds = data.folder.subfolders.map(i => i.id);
  const noteIds = data.folder.notes.map(i => i.id);

  console.log(folderIds);

  const [deleteNote] = useMutation(DELETE_NOTE);
  const [deleteFolder] = useMutation(DELETE_FOLDER);

  async function purge() {
    noteIds.map(async id => {
      deleteNote({ variables: { id: id },
        update(cache, { data: deleteNote }) {
          cache.evict({ id: `Note:${deleteNote.deleteNote.id}`});
        },
        refetchQueries: [{ 
          query: GET_FOLDER,
          variables: { id: user.homeFolder }
        }]
    
    });
    })
    folderIds.map(async id => {
      deleteFolder({ variables: { id: id }, 
        update(cache, { data: deleteFolder }) {
            cache.evict({ id: `Note:${deleteFolder.deleteFolder.id}`});
        },

        refetchQueries: [{ 
          query: GET_FOLDER,
          variables: { id: user.homeFolder }
        }]
      
      });
    })
    navigate(`/home`);
  }

  return (
    <>

    <a onClick={purge}>
    <IconContext.Provider value={{className:"add-btn"}}>
      <FaSkull />
    </IconContext.Provider>
    </a>
    </>
  );
}
