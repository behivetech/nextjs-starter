import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {getUserId} from 'graphql/server/token-util';

const APP_SECRET = process.env.APP_SECRET;

export const accountMutations = {
    signup: async (parent, {data}, context, info) => {
        const password = await bcrypt.hash(data.password, 10);
        const user = await context.prisma.createUser({...data, password});
        const token = jwt.sign({userId: user.id}, APP_SECRET);

        return {
            token,
            user,
        };
    },
    deleteUser: (_, {id}, context) => {
        return context.prisma.deleteUser({id});
    },
    updateUser: (root, args, context) => {
        const userId = getUserId(context);

        if (userId !== args.id) {
            throw new Error('You do not have priveledges to update this user.');
        }

        return context.prisma.updateUser({
            id: args.id,
            name: args.name,
            email: args.email,
        });
    },
    updatePassword: async (root, args, context) => {
        const userId = getUserId(context);
        let password;

        if (userId !== args.id) {
            throw new Error('You do not have priveledges to update this user.');
        } else {
            password = await bcrypt.hash(args.password, 10);
        }

        return context.prisma.updateUser({
            id: args.id,
            password: password,
        });
    },
};
