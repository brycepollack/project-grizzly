import { gql } from '@apollo/client';

const ADD_USER = gql`
    mutation addUser($authId: String!, $password: String!, $displayName: String!) {
        addUser(authId: $authId, password: $password, displayName: $displayName) {
            id
            authId
            password
            displayName
        }
    }
`;


export { ADD_USER };