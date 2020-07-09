import {AuthenticationError} from 'apollo-server-errors';
import {isString, pickBy} from 'lodash';

import {getSessionTokenObject} from 'graphql/lib/auth';

export async function getUser({id, email, sessionId}, {prisma}) {
    let user;

    if (sessionId) {
        const session = await prisma.userSession({id: sessionId});

        user = session ? session.user : undefined;
    } else {
        user = await prisma.user(pickBy({email, id}, isString));
    }

    return user;
}

export async function getUserId(context, forceAuthentication = true) {
    let userId;
    const tokenObject = await getSessionTokenObject(context);

    if (forceAuthentication && !tokenObject) {
        throw new AuthenticationError('NOT_AUTHENTICATED');
    }

    try {
        userId = tokenObject.userId;
    } catch (e) {
        if (forceAuthentication) {
            throw new AuthenticationError('SESSION_EXPIRED');
        }
    }

    return userId;
}
