const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }
  type User {
    _id: ID
    email: String
    pasteCount: Int
    pastes: [Paste]
  }
  type Paste {
    uuid: ID
    expires: String
    text: String
  }

  input readPasteInput {
    uuid: ID!
  }
  input loginInput {
    email: String!
    password: String!
  }
  input signupInput {
    email: String!
    password: String!
  }
  input createPasteInput {
    text: String!
  }
  input updatePasteInput {
    uuid: ID!
    text: String!
  }
  input deletePasteInput {
    uuid: ID!
  }

  type Query {
    me: User
    readPaste(input: readPasteInput!): Paste
  }

  type Mutation {
    login(input: loginInput!): Auth
    signup(input: signupInput!): Auth
    createPaste(input: createPasteInput!): User
    updatePaste(input: updatePasteInput!): User
    deletePaste(input: deletePasteInput!): User
  }
`;

module.exports = typeDefs;
