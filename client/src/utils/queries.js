import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me{
            email
            pastes {
                uuid
                text
                expires
            }
        }
    }
`;

export const READ_PASTE = gql`
    query readPaste($input: readPasteInput!) {
        readPaste(input: $input) {
            uuid
            text
            expires
        }
      }
`;
