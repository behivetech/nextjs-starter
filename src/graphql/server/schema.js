import {makeExecutableSchema} from 'graphql-tools';

// TypeDefs
import {AccountDefs} from '../type-defs/Account';

// Resolvers
import {accountResolvers} from '../resolvers/Account';

// Resolvers
import {accountMutations} from '../mutations/Account';

const Query = `type Query`;
const Mutation = `type Mutation`;
const typeDefs = [Mutation, Query, AccountDefs];
const resolvers = {
    Query: {
        ...accountResolvers,
    },
    Mutation: {
        ...accountMutations,
    },
};

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
