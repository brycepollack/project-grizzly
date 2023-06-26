import { gql } from '@apollo/client';

const ADD_FOLDER = gql`
    mutation addFolder($name: String!, $userId: ID!, $subfolders: [ID!], $notes: [ID!]) {
        addFolder(name: $name, userId: $userId, subfolders: $subfolders, notes: $notes) {
            id
            name
            user {
                id
                googleId
                displayName
            }
            subfolders {
                id
                name
            }
            notes {
                id
                title
                text
            }
        }
    }
`;

// haven't tested yet
const DELETE_FOLDER = gql`
    mutation deleteFolder($id: ID!) {
        deleteFolder(id: $id) {
            id
            name
            user {
                id
                googleId
                displayName
            }
            subfolders {
                id
                name
            }
            notes {
                id
                title
                text
            }
        }
    }
`;

// haven't tested yet
const UPDATE_FOLDER = gql`
  mutation updateFolder($name: String!, $subfolders: [ID!], $notes: [ID!]) {
    updateFolder(name: $name, subfolders: $subfolders, notes: $notes) {
        id
        name
        user {
            id
            googleId
            displayName
        }
        subfolders {
            id
            name
        }
        notes {
            id
            title
            text
        }
    }
  }
`;

export { ADD_FOLDER, UPDATE_FOLDER, DELETE_FOLDER };