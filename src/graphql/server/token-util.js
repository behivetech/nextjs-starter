import jwt from 'jsonwebtoken';
import {AuthenticationError} from 'apollo-server-errors';

// Getting a false positive from eslint on no-unused-modules when these are used

// eslint-disable-next-line import/no-unused-modules
export function getUserId(context, forceAuthentication = true) {
    let userId;
    const Authorization = context.request.get('Authorization');

    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        userId = jwt.verify(token, process.env.APP_SECRET).userId;
    }

    if (forceAuthentication && !userId) {
        throw new AuthenticationError('Not authenticated');
    }

    return userId;
}

// eslint-disable-next-line import/no-unused-modules
export function isAuthenticated(context, forceAuthentication = true) {
    const userId = getUserId(context, forceAuthentication);

    return !!userId;
}
