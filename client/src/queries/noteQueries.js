import { gql } from "@apollo/client";

const GET_NOTES = gql`
  query getNotes {
    notes {
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

const GET_MY_NOTES = gql`
  query getMyNotes($userId: ID!) {
    mynotes(userId: $userId) {
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

const GET_NOTE = gql`
  query getNote($id: ID!) {
    note(id: $id) {
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

export { GET_NOTES, GET_MY_NOTES, GET_NOTE };
