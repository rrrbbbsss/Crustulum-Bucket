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

                }
            }
        }
    }
`;

export const CREATE_PASTE = gql`
    mutation createPaste($input: createPasteInput!) {
        createPaste(input: $input) {
            paste {
                uuid
                text
            }
        }
    }
`;

export const UPDATE_PASTE = gql`
    mutation updatePaste($input: updatePasteInput!) {
        updatePaste(input: $input) {
            paste {
                uuid
                text
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
                }
            }
        }
    }
`;