import {ApolloServer} from 'apollo-server-micro';
import {prisma} from '../../../generated/prisma-client';

import {schema} from 'graphql/schema';

const apolloServer = new ApolloServer({
    context: (request) => {
        return {
            ...request,
            prisma,
        };
    },
    schema,
});

const apolloHandler = apolloServer.createHandler({
    path: '/api/graphql',
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloHandler;
