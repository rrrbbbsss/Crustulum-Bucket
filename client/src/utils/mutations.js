import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($input: loginInput!) {
        login(input: $input) {
            token
            user {
                _id
                email
                pastes {
                    uuid
                    text
                    expires
                }
            }
        }
    }
`;

export const SIGN_UP_USER = gql`
    mutation signup($input: signupInput!) {
        signup(input: $input) {
            token
            user {
                _id
                email
                pastes {
                    uuid
                    text
                    expires
                }
            }
        }
    }
`;

export const CREATE_PASTE = gql`
    mutation createPaste($input: createPasteInput!) {
        createPaste(input: $input) {
<<<<<<< HEAD
            paste 
=======
            pastes {
>>>>>>> develop
                uuid
                text
                expires
            }
        }
    }
`;

export const UPDATE_PASTE = gql`
    mutation updatePaste($input: updatePasteInput!) {
        updatePaste(input: $input) {
            pastes {
                uuid
                text
                expires
            }
        }
    }
`;

export const DELETE_PASTE = gql`
    mutation deletePaste($input: deletePasteInput!) {
        deletePaste(input: $input) {
            user {
                _id
                email
                pastes {
                    uuid
                    text
                    expires
                }
            }
        }
    }
`;