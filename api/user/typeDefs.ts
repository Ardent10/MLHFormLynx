export const typeDefs = `#graphql
  enum Gender {
    MALE
    FEMALE
    OTHER
  }

  scalar Date

  type User {
    id: ID!
    firstName: String
    lastName: String
    gender: Gender
    username: String
    dob: Date
    email: String!
    location: String
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input SignupUserInput {
    firstName: String
    lastName: String
    gender: Gender
    username: String
    dob: Date
    email: String!
    location: String
    password: String
  }

  type CreateUserPayload {
    user: User!
  }

  type LoginPayload {
    user: User!
    accessToken: String
  }

  input SearchUserInput {
    keyword: String!
  }

  type SearchUserPayload {
    users: [User]!
  }

  input VerifyTokenInput {
    token: String!
  }

  type VerifiedTokenPayload {
    userId: ID!
  }

  type Query {
    getAccount(id: String! ): User!
    getUser(id: ID!): User!
    users: [User]!
    searchUser(input: SearchUserInput!): SearchUserPayload!
  }

  type Mutation {
    signupUser(input: SignupUserInput!): CreateUserPayload!
    verifyToken(input: VerifyTokenInput!): VerifiedTokenPayload!
    login(input: LoginInput!): LoginPayload!
    logOut: Boolean!
  }
`;
