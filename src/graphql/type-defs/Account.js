export const AccountDefs = `
    extend type Query {
        userByID(id: String!): User
        userByEmail(email: String!): User
        userByAuth: User
        allUsers(data: AllUsersInput): [User!]!
        login(email: String!, password: String!): Token
    }
    extend type Mutation {
        signup(data: UserCreateInput): Token
        deleteUser(id: ID!): User!
        updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
        updatePassword(id: ID!, password: String!): User!
    }
    type Token {
        token: String!
    }
    type User {
        id: ID!
        createdAt: String!
        email: String!
        name: String!
        updatedAt: String!
    }
    input AllUsersInput {
        first: Int
        skip: Int
        id: Int
        email: String
        name: String
    }
    input UserCreateInput {
        password: String!
        name: String!
        email: String!
    }
    input UserUpdateInput {
        password: String
        name: String
        email: String
    }
    input UserWhereUniqueInput {
      id: ID
      email: String
    }
`;
