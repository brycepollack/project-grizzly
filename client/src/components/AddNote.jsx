import { useMutation, useQuery } from "@apollo/client";
import { ADD_NOTE } from "../mutations/noteMutations";
import { GET_NOTES, GET_MY_NOTES } from "../queries/noteQueries";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function AddNote({ user }) {

  //console.log("AddNote - User: " + JSON.stringify(user));

  const navigate = useNavigate();

  const title = "Untitled";
  const text = "";

  const [addNote] = useMutation(ADD_NOTE, {
    variables: { title : title, text : text, userId : user._id, },
    update(cache, { data: { addNote } }) {
      const { mynotes } = cache.readQuery({ query: GET_MY_NOTES, variables: { userId : user._id } });
      cache.writeQuery({
        query: GET_MY_NOTES,
        variables: { userId : user._id },
        data: { mynotes: [...mynotes, addNote] },
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
    <button className="btn btn-primary btn-lg" onClick={createNote}>
      New note
    </button>
  );
}
