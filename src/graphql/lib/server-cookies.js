import {serialize, parse} from 'cookie';

const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;
const MAX_AGE = Number(process.env.SESSION_TOKEN_MAX_AGE);
const SESSION_TOKEN_NAME = process.env.SESSION_TOKEN_NAME;
const isProd = () => process.env.NODE_ENV === 'production';

function getCookieParams() {
    const cookieDefaultParams = {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        path: '/',
        sameSite: 'lax',
    };
    const cookieProdParams = {
        domain: COOKIE_DOMAIN,
        secure: true,
        sameSite: 'strict',
    };

    return isProd() ? {...cookieDefaultParams, ...cookieProdParams} : cookieDefaultParams;
}

function parseCookies(req) {
    // For API Routes we don't need to parse the cookies.
    if (req.cookies) return req.cookies;

    // For pages we do need to parse the cookies.
    const cookie = req.headers?.cookie;
    return parse(cookie || '');
}

// Not sure why, but it shows this as not imported, but it is in the auth.js file
// esline-disable-next-line import/no-unused-module
export function setTokenCookie(res, token) {
    const cookie = serialize(SESSION_TOKEN_NAME, token, {
        ...getCookieParams(),
        httpOnly: true,
    });

    res.setHeader('Set-Cookie', cookie);
}

export function removeTokenCookie(res) {
    const cookie = serialize(SESSION_TOKEN_NAME, '', {
        maxAge: -1,
        path: '/',
    });

    res.setHeader('Set-Cookie', cookie);
}

export function getTokenCookie(req) {
    const cookies = parseCookies(req);

    return cookies[SESSION_TOKEN_NAME];
}
