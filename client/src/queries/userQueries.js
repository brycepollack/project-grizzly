import { gql } from "@apollo/client";

const GET_USER = gql`
  query getUser($authId: String!, $password: String!) {
    user(authId: $authId, password: $password) {
        id
        authId
        password
        displayName
    }
  }
`;

export { GET_USER };