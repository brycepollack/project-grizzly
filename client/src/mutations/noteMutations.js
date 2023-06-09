import { gql } from '@apollo/client';

const ADD_NOTE = gql`
    mutation addNote($title: String!, $text: String!, $userId: ID!) {
        addNote(title: $title, text: $text, userId: $userId) {
            id
            title
            text
            user {
              id
              authId
              displayName
            }
        }
    }
`;

const DELETE_NOTE = gql`
    mutation deleteNote($id: ID!) {
        deleteNote(id: $id) {
            id
        }
    }
`;

const UPDATE_NOTE = gql`
  mutation updateNote( $id: ID!, $title: String!, $text: String!, $lastEditedAt: Float!) {
    updateNote(id: $id, title: $title, text: $text, lastEditedAt: $lastEditedAt) {
      id
      title
      text
      user {
        id
        authId
        displayName
      }
      lastEditedAt
    }
  }
`;

export { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE };