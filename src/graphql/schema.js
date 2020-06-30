import {makeExecutableSchema} from 'graphql-tools';

// TypeDefs
import {AccountDefs} from './type-defs/Account';

// Resolvers
import {accountResolvers} from './resolvers/Account';

const Query = `type Query`;
const Mutation = `type Mutation`;
const typeDefs = [Mutation, Query, AccountDefs];
const resolvers = {
    Query: {
        ...accountResolvers.QUERY,
    },
    Mutation: {
        ...accountResolvers.MUTATION,
    },
};

// eslint-disable-next-line import/no-unused-modules
export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
