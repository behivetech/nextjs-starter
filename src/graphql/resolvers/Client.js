import {isAuthenticated} from '../server/token-util';

export const clientResolvers = {
    isLoggedIn: (parent, args, context) => {
        return isAuthenticated(context, false);
    },
    isSSR: () => {
        return typeof window === 'undefined';
    },
};
