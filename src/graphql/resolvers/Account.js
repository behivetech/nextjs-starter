import {ForbiddenError, UserInputError} from 'apollo-server-errors';
import {omit} from 'lodash';

import {setLoginSession} from '../lib/auth';
import {
    getUserId,
    getUser,
    getHashSalt,
    isAuthenticated,
    validatePassword,
} from '../lib/user';
import {removeTokenCookie} from '../lib/auth-cookies';

// Not sure why eslint doesn't think it's imported.
// eslint-disable-next-line import/no-unused-modules
export const accountResolvers = {
    QUERY: {
        userByAuth: (parent, args, context) => {
            isAuthenticated(context);
            const userId = getUserId(context);

            return getUser({id: userId}, context);
        },
        userByID: ({id}, args, context) => {
            isAuthenticated(context);
            return getUser({id}, context);
        },
        userByEmail: ({email}, _, context) => {
            isAuthenticated(context);
            return getUser({email}, context);
        },
        allUsers: (root, args, context, info) => {
            isAuthenticated(context);

            return context.prisma.users();
        },
        login: async (parent, {email, password}, context, info) => {
            const user = await getUser({email}, context);

            if (!user) {
                throw new UserInputError('Invalid username');
            }

            const passwordMatches = await validatePassword(user, password);

            if (!passwordMatches) {
                throw new UserInputError('Invalid password');
            }

            await setLoginSession(context.res, {id: user.id});

            return user;
        },
        logout: (_parent, _args, context, _info) => {
            removeTokenCookie(context.res);
            return true;
        },
    },
    MUTATION: {
        deleteUser: (_, {id}, context) => {
            isAuthenticated(context);
            return context.prisma.deleteUser({id});
        },
        signup: async (parent, {input}, context, info) => {
            const userExists = await getUser({email: input.email}, context);

            if (userExists) {
                throw new UserInputError(`User ${userExists.email} already exists`);
            }

            const user = await context.prisma.createUser({
                ...omit(input, 'password'),
                ...getHashSalt(input.password),
            });

            await setLoginSession(context.res, {id: user.id});

            return omit(user, ['hash', 'salt']);
        },
        updateUser: (root, args, context) => {
            const userId = getUserId(context);

            // Currently only users can modify themselves in this app unless this
            // conditional changes to meet other requirements.
            if (userId !== args.id) {
                throw new ForbiddenError(
                    'You do not have priveledges to update this user.'
                );
            }

            return context.prisma.updateUser({
                id: args.id,
                name: args.name,
                email: args.email,
            });
        },
        updatePassword: async (root, {password}, context) => {
            const userId = getUserId(context);

            return context.prisma.updateUser({
                ...getHashSalt(password),
                where: {id: userId},
            });
        },
    },
};
