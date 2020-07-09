export default `
directive @auth on FIELD_DEFINITION

type Query {
    _: String
}

type Mutation {
    _: String
}

type Subscription {
    _: String
}
`;
