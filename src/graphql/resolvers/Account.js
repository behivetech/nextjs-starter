import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {getUserId, isAuthenticated} from 'graphql/server/token-util';

const APP_SECRET = process.env.APP_SECRET;

function user({id, email}, args, context) {
    isAuthenticated(context);

    return context.prisma.user({id, email});
}

export const accountResolvers = {
    userByAuth: (parent, args, context) => {
        const userId = getUserId(context);

        return user({id: userId}, context);
    },
    userByID: ({id}, args, context) => {
        return user({id}, context);
    },
    userByEmail: ({email}, _, context) => {
        return user({email}, context);
    },
    allUsers: (root, args, context, info) => {
        // const userId = getUserId(context);

        return context.prisma.users();
    },
    login: async (parent, args, context, info) => {
        const user = await context.prisma.user({email: args.email});

        if (!user) {
            throw new Error('Invalid username');
        }

        const passwordMatches = await bcrypt.compare(args.password, user.password);
        const token = jwt.sign({userId: user.id}, APP_SECRET);

        if (!passwordMatches) {
            throw new Error('Invalid password');
        }

        return {
            token,
        };
    },
};
