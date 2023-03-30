import { gql } from '@apollo/client';

const GET_NOTES = gql`
    query getNotes {
        notes {
            id
            title
            text
        }
    }
`

export {GET_NOTES};