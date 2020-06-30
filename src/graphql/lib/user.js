import crypto from 'crypto';
import {AuthenticationError} from 'apollo-server-errors';
import {getLoginSession} from '../lib/auth';
import {isString, pickBy} from 'lodash';

function getHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

// Nothing like some good ol' hash salt as an extra security measure
// to protect a user's password (also great on popcorn)
export function getHashSalt(password) {
    const salt = crypto.randomBytes(16).toString('hex');

    return {
        hash: getHash(password, salt),
        salt,
    };
}

export async function getUser({id, email}, context) {
    const whereInput = pickBy({email, id}, isString);
    return await context.prisma.user(whereInput);
}

export async function getUserId(context, forceAuthentication = true) {
    let userId;
    const session = await getLoginSession(context.req);

    if (forceAuthentication && !session) {
        throw new AuthenticationError('Not authenticated');
    }

    try {
        const user = await getUser({id: session.id}, context);

        userId = user.id;
    } catch (e) {
        if (forceAuthentication) {
            throw new AuthenticationError('User does not exist');
        }
    }

    return userId;
}

export function isAuthenticated(context, forceAuthentication = true) {
    const userId = getUserId(context, forceAuthentication);

    return !!userId;
}

export async function validatePassword(user, password) {
    return user.hash === getHash(password, user.salt);
}
