import gql from 'graphql-tag';

import {ClientDefs} from '../type-defs/Client';
import {clientResolvers} from '../resolvers/Client';

export const typeDefs = gql`
    ${ClientDefs}
`;

export const resolvers = {...clientResolvers};
