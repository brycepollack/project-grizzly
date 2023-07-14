import { gql } from "@apollo/client";

const GET_FOLDER = gql`
    query getFolder($id: ID!) {
        folder(id: $id) {
            id
            name
            user {
                id
                authId
                displayName
            }
            subfolders {
                id
                name
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
            notes {
                id
                title
                text
                lastEditedAt
            }
        }
    }
`;

const GET_MY_FOLDERS = gql`
  query getMyFolders($userId: ID!) {
    myfolders(userId: $userId) {
        id
        name
        user {
            id
            authId
            displayName
        }
        subfolders {
            id
            name
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
        notes {
            id
            title
            text
        }
    }
  }
`;

// const GET_FOLDERS = gql`
//     query getFolders($ids: [ID!]) {
//         folders(ids: $ids) {
//             id
//             name
//             user {
//                 id
//                 authId
//                 displayName
//             }
//             subfolders {
//                 id
//                 name
//             }
//             notes {
//                 id
//                 title
//                 text
//             }
//         }
//     }
// `;

export { GET_FOLDER, GET_MY_FOLDERS };
