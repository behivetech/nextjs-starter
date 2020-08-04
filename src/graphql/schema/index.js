import {makeExecutableSchema} from 'apollo-server-micro';

// TypeDefs
import typeDefs from './type-defs';
import resolvers from './resolvers';
import schemaDirectives from './directives';

// eslint-disable-next-line import/no-unused-modules
export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives,
});
