import {accountResolvers} from './Account';

export default {
    Query: {
        ...accountResolvers.QUERY,
    },
    Mutation: {
        ...accountResolvers.MUTATION,
    },
};
