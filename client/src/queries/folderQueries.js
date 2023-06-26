import { gql } from "@apollo/client";

const GET_FOLDER = gql`
    query getFolder($id: ID!) {
        folder(id: $id) {
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

export { GET_FOLDER };
