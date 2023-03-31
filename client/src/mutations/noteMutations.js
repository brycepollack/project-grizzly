import { gql } from '@apollo/client';

const ADD_NOTE = gql`
    mutation addNote($title: String!, $text: String!) {
        addNote(title: $title, text: $text) {
            id
            title
            text
        }
    }
`;

const DELETE_NOTE = gql`
    mutation deleteNote($id: ID!) {
        deleteNote(id: $id) {
            id
            title
            text
        }
    }
`;

const UPDATE_NOTE = gql`
  mutation updateNote( $id: ID!, $title: String!, $text: String!) {
    updateNote(id: $id, title: $title, text: $text) {
      id
      title
      text
    }
  }
`;

export { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE };