import { gql } from '@apollo/client';

const DELETE_NOTE = gql`
    mutation deleteNote($id: ID!) {
        deleteNote(id: $id) {
            id
            title
            text
        }
    }
`;

export { DELETE_NOTE };