import Iron from '@hapi/iron';
import jwt from 'jsonwebtoken';
import {AuthenticationError, UserInputError} from 'apollo-server-micro';
import {get} from 'lodash';

import {getTokenCookie, removeTokenCookie, setTokenCookie} from './server-cookies';
import {getUser} from 'graphql/lib/user';
import {getHashSalt, validateHash} from 'graphql/lib/encryption';

const ACCESS_TOKEN_MAX_AGE = process.env.ACCESS_TOKEN_MAX_AGE;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const SESSION_TOKEN_MAX_AGE = Number(process.env.SESSION_TOKEN_MAX_AGE);
const SESSION_TOKEN_SECRET = process.env.SESSION_TOKEN_SECRET;

function createUserSession(prisma, userId) {
    const userSession = prisma.createUserSession({
        ttl: SESSION_TOKEN_MAX_AGE,
        user: {connect: {id: userId}},
    });

    if (!userSession && !userSession.id) {
        throw new AuthenticationError('USER_SESSION_CREATE_FAILED');
    }

    return userSession;
}

async function deleteUserSession(prisma, sessionId) {
    return await prisma.deleteUserSession({id: sessionId});
}

async function getNewTokens({prisma, res}, userId) {
    // Splitting up the encrypted hash/salt for the token to verify against.
    // The salt and clear sessionId will go into the sealed sessionToken.
    // The hash will go into the accessToken.
    const createdAt = Date.now();
    const {id: sessionId} = await createUserSession(prisma, userId);
    const {hash: sessionIdVal, salt: sessionIdKey} = await getHashSalt(sessionId);
    const sessionTokenParams = {
        createdAt,
        maxAge: SESSION_TOKEN_MAX_AGE,
        sessionIdKey,
        sessionId,
        userId,
    };
    const sessionToken = await Iron.seal(
        sessionTokenParams,
        SESSION_TOKEN_SECRET,
        Iron.defaults
    );

    const accessToken = await jwt.sign({sessionIdVal}, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_MAX_AGE,
    });

    await setTokenCookie(res, sessionToken);
    return accessToken;
}

export async function getSessionTokenObject(
    {prisma, req, restFetch},
    shouldValidate = true
) {
    const token = getTokenCookie(req);
    const tokenObject = token
        ? await Iron.unseal(token, SESSION_TOKEN_SECRET, Iron.defaults)
        : null;
    const expiresAt = tokenObject ? tokenObject.createdAt + tokenObject.maxAge * 1000 : 0;

    if (
        shouldValidate &&
        (!tokenObject ||
            Date.now() > expiresAt ||
            !prisma ||
            !(await prisma.userSession({id: tokenObject.sessionId})))
    ) {
        if (!restFetch) {
            throw new AuthenticationError('TOKEN_NO_SESSION');
        }
    }

    return tokenObject;
}

async function validateAccessToken(context) {
    let verifyResponse = false;
    const {sessionId, sessionIdKey} = await getSessionTokenObject(context);
    const authorization = get(context.req, 'headers.authorization');

    if (authorization) {
        const accessToken = authorization.replace('Bearer ', '');
        const {sessionIdVal} = (await jwt.verify(accessToken, ACCESS_TOKEN_SECRET)) || {};
        const tokenMatches = await validateHash(
            {salt: sessionIdKey, hash: sessionIdVal},
            sessionId
        );
        // Validate the expiration date and accessToken of the session

        if (tokenMatches) {
            verifyResponse = true;
        }
    }

    return verifyResponse;
}

async function validateCookieSession(context) {
    return true;
}

export async function getLoginResponse({email, password}, context) {
    const user = await getUser({email}, context);
    // const tokenObject = await getSessionTokenObject(context, false);

    // if (tokenObject && tokenObject.sessionId) {
    //     deleteUserSession(context.prisma, tokenObject.sessionId);
    // }

    if (!user) {
        throw new UserInputError('USER_INVALID_USERNAME');
    }

    const passwordMatches = await validateHash(user, password);

    if (!passwordMatches) {
        throw new UserInputError('USER_INVALID_PASSWORD');
    }

    const {id: userId} = user;
    const accessToken = await getNewTokens(context, userId);

    return {accessToken, name: user.name};
}

export async function getSignupResponse({email, name, password}, context) {
    const userExists = await getUser({email}, context);

    if (userExists) {
        throw new UserInputError('USER_EXISTING_ACCOUNT');
    }

    const {hash, salt} = await getHashSalt(password);
    const user = await context.prisma.createUser({
        email,
        name,
        hash,
        salt,
    });

    if (!user) {
        throw new AuthenticationError('USER_CREATE_FAILED');
    }

    const {id: userId} = user;
    const accessToken = await getNewTokens(context, userId);

    return {accessToken, name: user.name};
}

export async function getRefreshTokenResponse(context) {
    let refreshTokenResponse = {accessToken: null, name: null};

    if (!!getTokenCookie(context.req)) {
        const {userId, sessionId} = await getSessionTokenObject(context);
        const accessToken = await getNewTokens(context, userId);
        const {name} = await getUser({id: userId}, context);

        refreshTokenResponse = {
            accessToken,
            name,
        };

        await deleteUserSession(context.prisma, sessionId);
    }

    return refreshTokenResponse;
}

export async function removeLoginSession(context) {
    const {sessionId} = await getSessionTokenObject(context);

    await deleteUserSession(context.prisma, sessionId);
    removeTokenCookie(context.res);

    return true;
}

export function ensureSignedIn(context) {
    return context.ssrRequest
        ? validateCookieSession(context)
        : validateAccessToken(context);
}
