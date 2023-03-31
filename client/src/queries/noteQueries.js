import { gql } from '@apollo/client';

const GET_NOTES = gql`
    query getNotes {
        notes {
            id
            title
            text
        }
    }
`;

const GET_NOTE = gql`
  query getNote($id: ID!) {
    note(id: $id) {
      id
      title
      text
    }
  }
`;

export {GET_NOTES, GET_NOTE};