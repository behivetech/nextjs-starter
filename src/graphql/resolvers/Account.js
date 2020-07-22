import {ForbiddenError} from 'apollo-server-errors';

import {
    getLoginResponse,
    getRefreshTokenResponse,
    getSignupResponse,
    removeLoginSession,
} from 'graphql/lib/auth';
import {getUser, getUserId} from 'graphql/lib/user';
import {getHashSalt} from 'graphql/lib/encryption';

// Not sure why eslint doesn't think it's imported.
// eslint-disable-next-line import/no-unused-modules
export const accountResolvers = {
    QUERY: {
        userByAuth: (parent, args, context) => {
            const userId = getUserId(context);

            return getUser({id: userId}, context);
        },
        userByID: ({id}, args, context) => {
            return getUser({id}, context);
        },
        userByEmail: ({email}, args, context) => {
            return getUser({email}, context);
        },
        allUsers: (parent, args, context) => {
            return context.prisma.users();
        },
    },
    MUTATION: {
        deleteUser: (parent, {id}, context) => {
            return context.prisma.deleteUser({id});
        },
        login: async (parent, args, context) => {
            return getLoginResponse(args, context);
        },
        logout: (parent, args, context) => {
            return removeLoginSession(context);
        },
        refreshToken: (parent, args, context) => {
            return getRefreshTokenResponse(context);
        },
        signup: async (parent, {input}, context) => {
            getSignupResponse(input, context);
        },
        updateUser: (parent, args, context) => {
            const userId = getUserId(context);

            // Currently only users can modify themselves in this app unless this
            // conditional changes to meet other requirements.
            if (userId !== args.id) {
                throw new ForbiddenError('USER_UPDATE_FORBIDDEN');
            }

            return context.prisma.updateUser({
                id: args.id,
                name: args.name,
                email: args.email,
            });
        },
        updatePassword: async (parent, {password}, context) => {
            const userId = getUserId(context);

            return context.prisma.updateUser({
                ...getHashSalt(password),
                where: {id: userId},
            });
        },
    },
};
