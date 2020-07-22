export const AccountDefs = `
    extend type Query {
        userByID(id: String!): User @auth
        userByEmail(email: String!): User @auth
        userByAuth: User @auth
        allUsers(input: AllUsersInput): [User!]! @auth
    }
    extend type Mutation {
        login(email: String!, password: String!): LoginResponse!
        logout: Boolean!
        refreshToken: RefreshResponse!
        signup(input: UserCreateInput): LoginResponse!
        deleteUser(id: ID!): User! @auth
        updateUser(input: UserUpdateInput!, where: UserWhereUniqueInput!): User! @auth
        updatePassword(id: ID!, password: String!): User! @auth
    }
    type User {
        id: ID!
        createdAt: String!
        email: String!
        name: String!
        updatedAt: String!
    }
    type LoginResponse {
        accessToken: String!
        name: String!
    }
    type RefreshResponse {
        accessToken: String
        name: String
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
